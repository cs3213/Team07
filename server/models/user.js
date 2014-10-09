var mongoose = require('mongoose');

var User = mongoose.model('User', {
	oauthId: {type: String, unique: true}, 
	email: {type: String, unique: true}, 
	displayName: String
});


this.createUser = function(oauthId, email, displayName)
{
	User.findOne({ 'oauthId': oauthId }, function(err, user) {
		if(user == null && !err) {
			var createUser = new User({'oauthId': oauthId, 'email': email, 'displayName': displayName});
			createUser.save(function(err, done){
				return done;
			});
		}
	});
};
