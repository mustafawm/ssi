var express  = require('express');
var router   = express.Router();
var passport = require('passport');

// GOOGLE landing page
router.route('/google')
	.get(passport.authenticate('google', { 
		scope : ['profile', 'email'],
		approvalPrompt: 'auto'
	})); 
// response from provider 
router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users/',
		failure: '/error/'
	}));


// TWITTER landing page
router.route('/twitter')
	.get(passport.authenticate('twitter'));
	 
// response from provider 
router.route('/twitter/callback')
	.get(passport.authenticate('twitter', {
		successRedirect: '/users/',
		failure: '/error/'
	}));



module.exports = router;


