var mongoose = require('mongoose');
var Project = mongoose.model('Project', {
	userEmail: {type: String}, 
	created: {type:Date, default: Date.now}, 
	lastSaved: {type:Date, default: Date.now},
	project: Object 
});

this.save = function(userEmail, projectId, projectJson, callback)
{
	Project.findOne({ 'userEmail': userEmail}, function(err, project) {
		if (project === null && !err) {
			var saveProject = new Project({'userEmail': userEmail, 'project': projectJson});
			saveProject.save(function(err, done){
				return callback(done._id);
			});
		} else {
			Project.update({'userEmail': userEmail}, {$set: {'lastSaved': new Date(), 'project': projectJson}}, function(err, updated) {
				return callback(updated > 0);
			});
		}
	});
};

this.loadAllByUser = function(userEmail, callback)
{
	Project.find({'userEmail': userEmail}, function(err, projects){
		if(projects != null && !err){
			return callback(projects);
		}
		else{
			return callback([]);
		}
	});
}

this.loadById = function(projectId, callback)
{
	Project.findOne({'_id': projectId}, function(err, project){
		if(project != null && !err){
			return callback(project);
		}
		else{
			return callback({});
		}
	});
}