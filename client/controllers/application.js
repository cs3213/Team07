App.ApplicationController = Ember.ObjectController.extend({
	isLoggedIn: false,


	init: function () {
		this._super();
		this.send('getSession');
	},

    actions: {
        'login': function() {
        	var controller = this;
            $.getJSON("/auth/google/",function(result){
            	controller.send('getSession');
            });
        },
        'logout': function() {
        	var controller = this;
            $.getJSON("/logout",function(result){
            	controller.send('getSession');
            });
        },

	    getSession: function() {
	        var controller = this;
	        $.getJSON('/user').done(function(user) {
	            controller.set('isLoggedIn', user.authenticated);
	        }).error(function(){
	            Ember.Logger.log('error occur');
	        });
	    }
	}
});