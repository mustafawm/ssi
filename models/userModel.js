var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UserSchema = Schema({
	displayName : {
		type: String
	},
	image : {
		type: String
	},
	email: {
		type: String
	},
	google: {
		type: Object
	},
	twitter: {
		type: Object
	},
	facebook: {
		type: Object
	}
});
// so when requiring ../models/userModel, it will also include the
// this mongo model scheme
module.exports = mongoose.model('User', UserSchema);