//sqlite3 api见
// http://www.w3resource.com/node.js/nodejs-sqlite.php
// sqlite 语法见
// http://www.runoob.com/sqlite/sqlite-insert.html

//es6才能使用,
//最下面有测试用的调用
//接口返回的都是promise对象

//需要先调用open方法传入要打开的数据库名


let path = require("path"),
	sqlite3 = require('sqlite3').verbose();

class Sqlite{
	constructor(dbFileName='db'){
		this.db = null;

		this.open(dbFileName);
	}

	//打开数据库连接
	open(dbName){
		let dbPath = path.join(__dirname,"/"+dbName);
		this.db = new sqlite3.Database(dbPath);
	}

	//关闭数据库
	close(){
		let _this = this;
		return new Promise(success=>{
			if(!_this.db){
				success();
				return;
			}
			_this.db.close(function(){
				_this.db = null;
				success();
			});
		})
	}

	//执行语句，无返回
	run(sql,param){
		let _this = this;
		return new Promise((success,error)=>{
			_this.db.run(sql,param,function(err){
				if(err){
					error(err);
					return;
				}

				success();
			})
		})
	}

	//查询语句
	all(sql,param){
		let _this = this;
		return new Promise((success,error)=>{
			_this.db.all(sql,param,function(err,row){
				if(err){
					error(err);
					return;
				}

				success(row);
			})
		})
	}

	//事务
	//@param：sql 二维数组
	async transaction(sql){
		await this.run('BEGIN');
		let all = [];
		sql.map(rs=>{
			all.push(this.run(rs[0],rs[1]));
		});

		await Promise.all(all).then(async ()=>{
			await this.run('COMMIT');
		}).catch(async (msg)=>{
			await this.run('ROLLBACK');
			throw (msg);
		});
	}

	//插入一行并返回当前行
	//不晓得异步返回是否准确
	async insertBackRowId(sql,param){
		await this.run(sql,param);
		let rs = await this.all('select last_insert_rowid() ');

		return rs[0]['last_insert_rowid()'];
	}
}


module.exports = Sqlite;

// let test = async function(){
// 	//建立连接
// 	let sql = new Sqlite('db');
//
// 	//创建表
// 	await sql.run('CREATE TABLE IF NOT EXISTS test2 (' +
// 				//主键 自增长
// 				'idaa INTEGER PRIMARY Key autoincrement,' +
// 				//字符串
// 				'name TEXT' +
// 			')');
//
// 	// await sql.close();
// 	// console.log(db)
//
// 	//删除记录
// 	// await sql.run('DELETE  from test2');
//
//
// 	//传入数据
// 	// await sql.run('INSERT INTO test (name) VALUES(?)',['aa']);
// 	// await sql.run('INSERT INTO test (name) VALUES(?)',['bb']);
//
//
// 	// 事务 速度测试
// 	// 10000条数据1.1秒
// 	// 1000条数据0.14秒
// 	// let sqls = [];
// 	// for(let i=0,l=1000;i<l;i++){
// 	// 	sqls.push(['INSERT INTO test (name) VALUES(?)',[i]]);
// 	// }
// 	// console.log(new Date().getTime());
// 	// await sql.transaction(sqls);
// 	// console.log(new Date().getTime());
//
//
// 	// await sql.transaction([
// 	// 	['INSERT INTO test (name) VALUES(?)',['aa']],
// 	// 	['INSERT INTO test (name) VALUES(?)',['bb']],
// 	// 	['INSERT1 INTO test (name) VALUES(?)',['cc']]
// 	// ]);
//
//
// 	//获取全部数据
// 	// let rows = await sql.all('SELECT * FROM test');
// 	// console.log(rows)
//
//
// 	//插入后返回最后的id
// 	// let aa= await sql.all('select last_insert_rowid() ');
// 	// console.log(aa[0]['last_insert_rowid()'])
//
// 	let id = await sql.insertBackRowId('INSERT INTO test2 (name) VALUES(?)',['aa']);
// 	console.log(id);
//
// };

// test().then().catch(rs=>console.log(rs));

