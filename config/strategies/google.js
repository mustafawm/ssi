var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');


module.exports = function(passport) {
	// A: confirm with google
	passport.use(new GoogleStrategy({
		clientID: process.env.G_CLIENT_ID,
		clientSecret:process.env.G_CLIENT_SECRET,
		callbackURL: 'http://127.0.0.1:3000/auth/google/callback'

	}, // B: get response from google
	function (req, accessToken, refreshToken, profile, done) {
		var query = { 'google.id': profile.id };

		User.findOne( query, function(err, user) {
			if (user) {
				console.log("user found");
				done(null, user);
			} else {
				console.log("no user found");
				var user = new User(
				{
					email: profile.emails[0].value,
					image: profile._json.image.url,
					displayName: profile.displayName,
					google:
					{
						id: profile.id,
						token: accessToken,
						refreshToken: refreshToken
					}
				});
				user.save();
				// add user to the account
				done(null, user);
			}
		}); // end userFind
	}));
};
