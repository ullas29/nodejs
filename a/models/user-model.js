var db = require('./db');



//edit e jaoyar rastar model

module.exports= {
	getById : function(eid, callback){
		var sql = "select * from employee where eid=?";
		db.getResults(sql, [eid], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},

    //view user er model
	getAll : function(callback){
		var sql = "select * from employee";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

    //login validation
	validate: function(user, callback){
		var sql ="SELECT * FROM employee where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	getByUname: function(username, callback){
		var sql = "select * from employee where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	insert: function(user, callback){
		var sql = "insert into employee values(?,?,?,?,?,?)";
		db.execute(sql, [null, user.username, user.password, user.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	update : function(user, callback){
		var sql = "update employee set username=?,ename=?,contact=?, password=?, status=? where eid=?";
		db.execute(sql, [user.username, user.ename,user.contact,user.password, user.status, user.eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},



	delete: function(user, callback){
		var sql = "delete from employee where eid=?";
		db.execute(sql, [user.eid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}