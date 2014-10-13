var mongoose = require('mongoose');
var Project = mongoose.model('Project', {
	userEmail: {type: String}, 
	created: {type:Date, default: Date.now}, 
	lastSaved: {type:Date, default: Date.now},
	project: Object 
});

this.save = function(userEmail, projectId, projectJson)
{
	Project.findOne({ '_id': projectId}, function(err, project) {
		if(project == null && !err) {
			var saveProject = new Project({'userEmail': userEmail, 'project': projectJson});
			saveProject.save(function(err, done){
				return done;
			});
		}
		else {
			Project.update({'_id': projectId}, {$set: {'lastSaved': new Date(), 'project': projectJson}}, function(err, updated){
				return updated;
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
			return callback(null);
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
			return callback(null);
		}
	});
}