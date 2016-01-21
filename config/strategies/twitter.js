var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {
	passport.use(new TwitterStrategy({
		consumerKey: 'fHP5mGLhZ3rtqZz7JkQVuPscr',
		consumerSecret: 'rE5C1II5qpO7LkPPZW0DkddewzUtNhCb8yW2sIIGvHTPqfXgs9',
		callbackURL: 'http://localhost:3000/auth/twitter/callback',
		passReqToCallback: true
	}, 
	function(req, token, tokenSecret, profile, done){
		var user = {
			// email: profile.emails[0].value,
			image: profile._json.profile_image_url,
			displayName: profile.displayName,

			twitter: {
				id: profile.id,
				token: token
			}
		};
		// add user to the account
		done(null, user);
	}));
};