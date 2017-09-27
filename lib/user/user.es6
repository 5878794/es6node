
//以sqlite数据库接口来写的，更换数据库需要按照sqlite输出的接口来封装。
let sql = require("./../db/sqlite/sqlite"),
	crypto = require('crypto'),
	md5 = function(text){
		return crypto.createHash('md5').update(text).digest('hex');
	},
	//token有效期 30分钟
	tokenCanUseStamp = 30*60*1000,
	//sqlite文件名
	dbName = 'db';



let User = {
	db:null,

	//初始化
	async _init(){
		if(this.db){
			return;
		}

		await this._createTable();
	},

	//创建表
	async _createTable(){
		//库文件名
		this.db = new sql(dbName);
		//创建表
		await this.db.run('CREATE TABLE IF NOT EXISTS d_users (' +
			//主键 自增长
			'id INTEGER PRIMARY Key autoincrement,' +
			//用户名
			'u_username TEXT,' +
			//密码
			'u_password TEXT,'+
			//token
			'u_token TEXT,'+
			//token更新时间
			'u_token_time INT,'+
			//其它信息 json字符串
			'u_other_info TEXT'+
			')');
	},

	//新增
	async add(username,password,otherInfo){
		await this._init();

		await this._checkUsernameHasUse(username);

		let id = await this.db.insertBackRowId(
			'insert into d_users(u_username,u_password,u_other_info) values(?,?,?)',
			[username,password,otherInfo]
		);

		return await this.getById(id);
	},

	//检查是否用户名已存在
	async _checkUsernameHasUse(username){
		let name = await this.db.all(
			'select u_username from d_users where u_username=?',
			username
		);

		if(name.length==0){
			return true;
		}else{
			throw("用户名已存在");
		}
	},

	//删除,通过id
	async delById(id){
		await this._init();
		await this.db.run(
			'delete from d_users where id=?',
			[id]
		);
	},

	//获取全部用户列表
	async getAll(){
		await this._init();
		return await this.db.all('select * from d_users');
	},

	//根据用户名查询用户
	async searchByUsername(str){
		await this._init();
		return await this.db.all(
			'select * from d_users where u_username like ?',
			["%"+str+"%"]
		);
	},

	//根据用户id获取用户信息
	async getById(id){
		await this._init();
		let rs = await this.db.all(
			'select * from d_users where id=?',
			[id]
		);
		return rs[0];
	},

	//根据用户token获取用户信息
	async getByToken(token){
		await this._init();

		let rs = await this.db.all(
			'select * from d_users where u_token=?',
			[token]
		);

		if(rs.length == 0){
			throw("您还没有登陆");
		}else if(rs.length == 1){
			//检查token是否已过期
			let lastStamp = rs[0].u_token_time,
				nowStamp = new Date().getTime();
			if(lastStamp+tokenCanUseStamp >= nowStamp){
				await this._refreshTokenTime(rs[0].id,nowStamp);
				return await this.getById(rs[0].id);
			}else{
				throw("token已失效，请重新登陆");
			}
		}else{
			throw("系统错误，请重新登陆！");
		}
	},

	//生成token
	_getToken(username,password,stamp){
		let str = username+password+stamp;
		return md5(str);
	},

	//更新token时间
	async _refreshTokenTime(id,stamp){
		await this.db.run(
			'update d_users set u_token_time=? where id=?',
			[stamp,id]
		);
	},

	//生成用户token
	async _createToken(rs){
		let id = rs.id,
			timeStamp = new Date().getTime(),
			token = this._getToken(rs.u_username,rs.u_password,timeStamp);

		await this.db.run(
			'update d_users set u_token=?,u_token_time=? where id=?',
			[token,timeStamp,id]
		);
	},

	//更改密码
	async changePassword(token,oldPassword,newPassword){
		await this._init();

		let rs = await this.getByToken(token);
		if(rs.u_password == oldPassword){
			await this.db.run(
				'update d_users set u_password=? where id=?',
				[newPassword,rs.id]
			)
		}else{
			throw("原始密码错误");
		}

	},

	//忘记密码
	forgetPassword(){

	},

	//登陆
	async login(username,password){
		await this._init();

		let rs = await this.db.all(
			'select * from d_users where u_username = ? and u_password = ?',
			[username,password]
		);

		if(rs.length == 0){
			throw("用户名与密码不匹配");
		}else if(rs.length == 1){
			await this._createToken(rs[0]);
			return await this.getById(rs[0].id);
		}else{
			throw("数据错误！！！");
		}
	},

	//登出
	async logout(token){
		await this._init();

		await this.db.run(
			'update d_users set u_token="" where u_token=?',
			[token]
		);
	}
};


module.exports = User;



// let test = async function(){
// 	// let ddd = new sql('db');
// 	// let rs = await ddd.all('select * from d_users')
// 	// console.log(rs);
// 	// await ddd.run('delete  from d_users');
// 	// await ddd.close();
//
//
// 	// let info = await User.add('bens4','123123','{a:1,b:2}');
// 	// console.log(info)
//
//
// 	// let nowList = await User.login("bens4","222222");
// 	// console.log(nowList);
//
// 	// let userInfo = await User.getByToken(nowList.u_token);
// 	// console.log(userInfo)
//
// 	// await User.logout(nowList.u_token);
//
// 	// await User.delById(info.id);
//
// 	// return await User.getAll();
//
//
// 	// await User.changePassword(nowList.u_token,'123123','222222');
//
// };

// test()
// 	.then(rs=>console.log(rs))
// 	.catch(msg=>console.log(msg));