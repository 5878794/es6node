let exec = require("./../../../../lib/fn/exec"),
	list = require("./../svnList"),
	svnUser = require('./../setting'),
	getDataFn = require("./../../../../lib/fn/getRequestData"),
	path = require("path"),
	getProjectUrl = function(id){
		let backUrl;
		list.map(rs=>{
			if(rs.id == id){
				backUrl = rs.svnUrl;
			}
		});

		return backUrl;
	},
	handlerData = function(data){
		data = data.split(/\-{10,}/ig);
		data = data.filter(rs=>{
			if(rs.indexOf('line')>-1){
				return rs;
			}
		});
		let newData =[];
		data.map(rs=>{
			rs = rs.split('|');
			let ver = rs[0].replace(/[\n\s]/ig,''),
				name = rs[1].replace(/\s/ig,''),
				time = rs[2].split(' ');
			time = time[1]+' '+time[2];
			let msg = rs[3].replace(/\n/ig,'').replace(/.*?line(.*?)/,'$1');

			newData.push({
				ver:ver,
				name:name,
				date:time,
				msg:msg
			});
		});

		return newData;
	};



module.exports =async function(request){
	let {getData} = await getDataFn(request),
		id = getData.id,
		url = getProjectUrl(id),
		cmd = 'svn log '+url+' -l 50 --username '+svnUser.username+' --password '+svnUser.password,
		result = await exec(cmd);

	let backData;

	if(result.state == 1){
		let data = result.data;
		data = handlerData(data);
		backData = {
			state:1,
			data:data
		};
	}else{
		let msg = result.msg;
		backData = {
			state:0,
			msg:msg
		};
	}

	return backData;
};