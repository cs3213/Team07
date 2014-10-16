App.Router.map(function() {
    this.resource('project', { path: '/' }, function() {});
	this.resource('login', { path: '/auth/google'}, function() {});
});