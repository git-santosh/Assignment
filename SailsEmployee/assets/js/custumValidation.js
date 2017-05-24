$( "#signupForm" ).validate( {
				rules: {
					name: {
						required: true
						
					},
					address: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					dob: {
						required: true
					},
					phone: {
						required: true,
						minlength: 10
					}
					
				},
				success:function (argument) {
					argument.text('ok !').addClass('valid');
					// body...
				}
				
			} );