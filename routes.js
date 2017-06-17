//here only routing is done and if the ro

'use strict';
/*
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
*/
const register = require('./functions/register');
const login = require('./functions/login');
//const profile = require('./functions/profile');
//const password = require('./functions/password'); 
//const config = require('./config1/config.json');

module.exports = router => {
      
	  router.get('/', (req, res) => res.end('Welcome to crowdfunding,please hit a service !'));

	   router.post('/login', (res, req) => {

		var email = req.body.email;
		console.log(email,"email from ui");
		var passpin = req.body.name;

		

		if (!email ||!passpin  || !email.trim() ||!passpin.trim() ) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(email,passpin)

			.then(result => {

             var token = "";
             var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789rapidqubepvtltd";

             for( var i=0; i < 25; i++ )
             text += possible.charAt(Math.floor(Math.random() * possible.length));

            console.log (token);
			
				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/testservice', (req,res) => {
		res.status(200).json({ message: "your service is working" });
	})

	router.post('/registerUser', (req, res) => {

		const name = req.body.name;
		const email = req.body.email;
	    const phone = req.body.phone;
		const pan= req.body.pan;
		const aadhar = req.body.aadhar;
	    const usertype = req.body.usertype;
		const upi = req.body.upi;
		const passpin = req.body.passpin;
		
			

		if (!name || !email || !phone || !pan ||!aadhar ||!usertype ||!upi ||!passpin || !name.trim() ||!email.trim()||!phone.trim()
		|| !pan.trim() ||!aadhar.trim()|| !usertype.trim()||!upi.trim()||!passpin.trim()) {
             //the if statement checks if any of the above paramenters are null or not..if is the it sends an error report.
			res.status(400).json({message: 'Invalid Request !'});

		} else {
			console.log("register object"+ register)
			
			register.registerUser(name,email,phone,pan,aadhar,usertype,upi,passpin)
			.then(result => {

			//	res.setHeader('Location', '/registerUser/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});
/*
	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}*/
}