var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = function() {

	passport.use(new GoogleStrategy({
		clientID: '601535605845-07qii3u9k8ldafv850ohsipnnd6ttnc2.apps.googleusercontent.com',
		clientSecret:'CPTMzi_fDX_1djHFVDOgx9WN',
		callbackURL: 'http://localhost:3000/auth/google/callback'

	}, function (req, accessToken, refreshToken, profile, done) {
		done(null, profile);
	}));
	// 1. store to session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// 2. pull from session to use (in db)
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	// 3. strategy

};