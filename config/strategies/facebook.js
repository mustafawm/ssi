var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');


module.exports = function(passport) {
	passport.use(new FacebookStrategy({
		clientID: '1493871967587653',
		clientSecret: 'c4d65a383c9e56108106f0cd0833db70',
		callbackURL: 'http://local.host:3000/auth/facebook/callback',
		PassReqToCallback: true,
		profileFields: ['id', 'emails', 'displayName', ]
	}, 
	function(req, accessToken, refreshToken, profile, done) {
		var query = {'facebook.id': profile.id};

		User.findOne(query, function(err, user) {
			if (user) {
				console.log("user found -- fb");
				done(null, user);
			} else {
				console.log("user not found -- fb");
				var user = new User({
					email: profile.emails[0].value,
					// image: profile._json.profile_image_url,
					displayName: profile.displayName,
					facebook: 
					{
						id: profile.id,
						token: accessToken,
						refreshToken: refreshToken
					}
				}); // end user
				user.save();
				done(null, user);
			}
		}); // end findOne
	}));
};