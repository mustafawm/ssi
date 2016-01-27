var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');


module.exports = function(passport) {
	passport.use(new TwitterStrategy({
		consumerKey: process.env.TWT_CONS_KEY,
		consumerSecret: process.env.TWT_CONS_SECRET,
		callbackURL: 'http://localhost:3000/auth/twitter/callback',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, done){
		var query = {'twitter.id': profile.id};
		User.findOne(query, function(err, user) {
			if (user) {
				console.log("user found --twitter");
				done(null, user);
			} else {
				var user = new User({
					// email: profile.emails[0].value,
					image: profile._json.profile_image_url,
					displayName: profile.displayName,
					twitter:
					{
						id: profile.id,
						token: token,
						tokenSecret: tokenSecret
					}
				}); // end use
				user.save();
				done(null, user);
			}
		}); // end userFind
	}));
};
