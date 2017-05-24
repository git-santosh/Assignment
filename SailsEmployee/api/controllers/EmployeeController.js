/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req,res,next){
		res.view();
	},
	create:function(req,res,next){
		var params= req.params.all();
		var file_name ='';
		console.log('Param while create '+ JSON.stringify(params));
		req.file('userPhoto').upload({
			   dirname: require('path').resolve(sails.config.appPath, 'assets/images')},function(err,files){
			   sails.log.debug('file is :: ', +files);
			    maxBytes: 10000000;
			   if (err) return res.serverError(err);       
			   console.log(files[0].fd);
			   		var emp ={
								name:params.name, 
								address:params.address,
								email:params.email,
								dob:params.dob,
								phone:params.phone,
								userPhoto:files[0].fd
							};
				Employee.create(emp,function userCreated(err,user){
					if(err)
					{
						console.log(err);
						return res.redirect('/Employee/add');
						//  res.json({
						//  	err:err
						//  });
					}
					
					sails.log.debug('Success', JSON.stringify(user));
					//res.send('Thank you from Registration'+ params.name);
					//res.redirect('/Employee/show/'+user.id);.
					res.redirect('/Employee');
				});
			      //res.json({status:200,file:files});
			   });
	
	
		
	},
	show:function(req,res,next){
		Employee.findOne(req.param('id'),function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user:user
			});
		})
	},
	showAll:function(req,res,next){

	},
	edit:function(req,res,next){
		var id=req.param('id');
		Employee.findOne(id,function foundUser(err,user){
			if(err) return next(err);
			console.log(user);
			res.view({
				user:user
			});
		});
	},
	update:function(req,res,next){
		var id=req.param('id');
		Employee.update(id,req.params.all()).exec(function(err){
			if(err) return next(err);
			res.redirect('/Employee/show/'+id);
			//res.send('Record has been updated');

		});
	},
	index:function(req,res,next){
		Employee.find(function foundUsers(err,users){
			if(err) return next(err);
			console.log(users);
			res.view({
				users:users
			});
		});
	},
	destroy:function(req,res,next){
		Employee.findOne(req.param('id'),function findOne(err,user){
			if(err) return next(err);

			if(!user) return next('user doesn\'t Exit.');

			Employee.destroy(req.param('id'),function removeMe(err,remove){
				 if(err) return next(err);

				 res.redirect('/Employee');	
			});
		});
	},

};

