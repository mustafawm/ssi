var express = require('express');
var router = express.Router();

// security middleware
router.use('/', function(req, res, next) {
	if ( ! req.user ) {
		res.redirect('/');
	}
	next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	// req.user added by passport (check google strategy)
  	res.render('users', 
  		{ 
  			user: {
			  	name: req.user.displayName,
	  			image: req.user.image 
	  		}
	  	}
	); 
});

module.exports = router;
