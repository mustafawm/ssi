var session = require('express-session');
var passport = require('passport');

module.exports = function(app) {
	// middlewares
	app.use(session({secret: "anything"}));
	app.use(passport.initialize());
	app.use(passport.session());

	
	// 1. store to session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// 2. pull from session to use (in db)
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	// 3. strategy
	require('./strategies/google')(passport);
};