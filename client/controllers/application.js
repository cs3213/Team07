App.ApplicationController = Ember.ObjectController.extend({
	isLoggedIn: this.send('getSession');,

	getSession: function(){
		$.getJSON('/user').done(function(user){
			controller.set('isLoggedIn', user.authenticated);
		}).error(function(){
			Ember.Logger.log('error occur');
		});
	}

	init: function () {
		this._super();
		var controller = this;
		$.getJSON('/user').done(function(user){
			controller.set('isLoggedIn', user.authenticated);
		}).error(function(){
			Ember.Logger.log('error occur');
		});
	},

    actions: {
        'login': function() {
        	var controller = this;
            $.getJSON("/auth/google/",function(result){});
            this.send('getSession');
        },
        'logout': function() {
        	var controller = this;
            $.getJSON("/logout",function(result){});
            this.send('getSession');
        },
    }
});