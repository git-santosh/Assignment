/**
 * Employee.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'arkeneaMongoDB',
  schema:true,
  autoPK: true,

  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
  			name:
				 {
							type:'string', 
							required:true			
				},
			address: {
	 						type:'string', 
							required: true
					},
			email:{
							type:'string',
							email:true,
							unique:true,
							required:true		
				},	
			dob:{
							type:'string',
							required: true
			},		
			phone:{
							type: 'string', 
							required: false
				},
			userPhoto:{
							type:'string'
			}
  }
};

