var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');






router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});






router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});





//user dekher rasta

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});


//edit e jaoyar rasta

router.get('/edit/:eid', function(req, res){
	userModel.getById(req.params.eid, function(result){
		res.render('home/edit', {user: result});
	});
});






router.post('/edit/:eid', function(req, res){
	
		var user = {
			eid: req.params.eid,
			username: req.body.username,
			ename: req.body.ename,
			contact: req.body.contact,
			password: req.body.password,
			status: req.body.status
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.eid);
			}
		});
});

module.exports = router;