/**
 * RecipeController
 *
 * @description :: Server-side logic for managing recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        res.view();
    },
    create : function(req,res,next){
        var params=req.params.all();
        req.file('r_image').upload({
			   dirname: require('path').resolve(sails.config.appPath, 'assets/images')},function(err,files){
			   sails.log.debug('file is :: ', +files);
			    maxBytes: 10000000;
			   if (err) return res.serverError(err);       
			   console.log(files[0].fd);
               var recp ={
								r_name:params.r_name, 
								description:params.description,
								calories:params.calories,
								r_create_date:params.r_create_date,
								ingredient_name:params.ingredient_name,
								r_image:files[0].fd
							};
              Recipe.create(recp,function addRecipe(err,Recipe){
                    if(err){
                        console.log('Error on create : '+err);
                        return next(err);
                    }
                      console.log('Receipe Created successfully :\n'+JSON.stringify(Recipe));
                      //res.send('recipe created');
                         res.redirect('/Recipe/show/'+Recipe.id);
                 });
        });
        
    },
    show : function(req,res,next){
        Recipe.findOne(req.param('id'),function findRecipe(err,recipe){
                if(err){
                    console.log('Error on show :'+err);
                    return next(err);
                }
                if(!Recipe) return next(err);
                res.view({
                    recipes:recipe
                });
        });
    },
    edit:function(req,res,next){
        var id = req.param('id');
        Recipe.findOne(id,function editRecipe(err,recipe){
            if(err){
                console.log('Error on eidt action : '+ err);
                return next(err);
            }
            res.view({
                recipes:recipe
            });
        });
    },
    update:function(req,res,next){
        var id = req.param('id');
        Recipe.update(id,req.params.all()).exec(function(err){
            if(err){
                console.log(err);
                return next(err);
            }
            res.redirect('/Recipe/show/'+id);
        });
    },
    findRecipe: function(req,res){
        res.view();
    },
    findRecipeByName:function(req,res,next){
        var name = req.param('r_name');
        console.log(name);
        var params= req.params.all();
        Recipe.findOne({r_name:name}).exec(function(err,recipe){
            if(err){
                console.log('Error in findRecipeByName '+err);
                return res.serverError(err);
              
            }
            if(!recipe){
               return  res.send('Could not find  Recipe ,Sorry.');
            }
            res.view({
                recipes:recipe
            });
        });
    },
    index:function(req,res,next){
		Recipe.find(function foundUsers(err,recipe){
			if(err) return next(err);
			res.view({
				recipes:recipe
			});
		});
	},
    destroy:function(req,res,next){
		Recipe.findOne(req.param('id'),function findOne(err,user){
			if(err) return next(err);

			if(!user) return next('Recipe doesn\'t Exit.');

			Recipe.destroy(req.param('id'),function removeMe(err,remove){
				 if(err) return next(err);

				 res.redirect('/Recipe');	
			});
		});
	},
};

