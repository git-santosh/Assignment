var express =require('express');

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
            // res.render('empList.ejs',{
            //     "empList" : data
            // });
            res.render('index.ejs');
        }
    });
    
});

module.exports = router;