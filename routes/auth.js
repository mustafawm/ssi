var express  = require('express');
var router   = express.Router();
var passport = require('passport');


router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/users/',
		failure: '/error/'
	}));

router.route('/google')
	.get(passport.authenticate('google', { 
		scope : ['profile', 'email'],
		approvalPrompt: 'auto'
	})); 

module.exports = router;