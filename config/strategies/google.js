var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {
	// A: confirm with google 
	passport.use(new GoogleStrategy({
		clientID: '601535605845-07qii3u9k8ldafv850ohsipnnd6ttnc2.apps.googleusercontent.com',
		clientSecret:'CPTMzi_fDX_1djHFVDOgx9WN',
		callbackURL: 'http://127.0.0.1:3000/auth/google/callback'

	}, // B: get response from google
	function (req, accessToken, refreshToken, profile, done) {
		var user = {
			email: profile.emails[0].value,
			image: profile._json.image.url,
			displayName: profile.displayName,

			google: {
				id: profile.id,
				token: accessToken
			}
		};
		// add user to the account
		done(null, user);
	}));
};