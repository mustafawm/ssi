var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {
	passport.use(new GoogleStrategy({
		clientID: '601535605845-07qii3u9k8ldafv850ohsipnnd6ttnc2.apps.googleusercontent.com',
		clientSecret:'CPTMzi_fDX_1djHFVDOgx9WN',
		callbackURL: 'http://127.0.0.1:3000/auth/google/callback'

	}, function (req, accessToken, refreshToken, profile, done) {
		done(null, profile);
	}));
};