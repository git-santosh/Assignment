/**
 * Recipe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection :'arkeneaSQL',
  autoPK:true,
  attributes: {
        r_name :{
                  type:'string',
                  required:true,
                  unique:true
        },
        description :{
                  type:'string',
                  required:true
        },
        calories: {
                  type:'string',
                  required:true
        },
        r_create_date:{
                  type:'date',
                  required:true
        },
        r_image:{
                  type:'string',
        },
        ingredient_name:{
                type : 'string'
        } 


  }
};

