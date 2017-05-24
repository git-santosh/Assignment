var express = require('express');

var router = express.Router();

router.get('/',function(req,res){
    var db = req.db;
    var empCollection = db.get('empCollection');
    empCollection.find({},{},function(err,data){
        if(err){
            res.send("Error occured");
  		    res.end();
        }
        else{
            res.render('empList.ejs',{
                "empList" : data
            });
        }
    });
});

    

router.get('/add', function(req, res) {
	console.log("add");
	res.render('newUser.ejs', {});
});
router.get('/edit/:id',function(req,res){
    var db = req.db;
    var empCollection = db.get('empCollection');
     empCollection.find({_id:req.params.id},function(err,data){
         if(err){
             res.send('Error Occured');
             res.end();
         }
         else{
             console.log('Edit Data : '+JSON.stringify(data));
             res.render('editUser.ejs',{
                 emp:data[0]
             });
         }
     });
 
});
router.post('/editUser',function(req,res,next){
    var db=req.db;
    var empCollection = db.get('empCollection');
    
    empCollection.update({_id:req.body.id},{name:{ firstName : req.body.firstName,lastName :req.body.lastName},
    dob:req.body.dob,email:req.body.email,phone:req.body.phone },function(err,data){
        if(err){
            res.send('Error Occured');
            res.end();
        }
        else{
            res.location('users');
            res.redirect('/users');
        }
    });
});
router.post('/create',function(req,res,next){
    var db = req.db;
    var empCollection =db.get('empCollection');
    empCollection.insert({ name:{ firstName : req.body.firstName,lastName :req.body.lastName},
    dob:req.body.dob,email:req.body.email,phone:req.body.phone },function(err,data){
    if(err) {
  		res.send("Error occured");
  		res.end();
  	} else {
  		//res.send('user regisered successfully');
          res.location("users");
          res.redirect("/users");
  	}
    });
});
router.get('/delete/:id',function(req,res,next){
    var db= req.db;
    var empCollection=db.get('empCollection');
    console.log("Removed ID : "+req.params.id);
    empCollection.remove({_id : req.params.id},function(err,data){
            if(err){
                res.send("Error Occured");
                res.end();
            }
            else{
                res.location("users");
                res.redirect("/users");
            }
    });
   
   

});
module.exports =router;