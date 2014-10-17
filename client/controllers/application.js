App.ApplicationController = Ember.Controller.extend({
    isLoggedIn: false,

    init: function () {
        this._super();

        var controller = this;
        
        this.store.find('user', 1).then(function(user) {
            if (typeof user !== 'undefined' &&
                user.get('id') == 1) {
                controller.set('loggedInUser', user);
                controller.set('isLoggedIn', true);
            }
        });
    },

    actions: {
        login: function() {
            // Transit current page to login page since it might be possible
            // that we are going out of the domain.
            window.location = '/login';
        },
        logout: function() {
            var controller = this;
            $.getJSON('/logout').done(function(res) {
                controller.set('loggedInUser', null);
                controller.set('isLoggedIn', false);
            }).error(function(res) {
                Ember.Logger.log('Error logging out.');
            });
        },

        /*saveProject: function() {
            var controller = this;
            $.getJSON('/save',
                    {
                        // not sure how to get the required datas from models
                        // testing out the code
                        user: this.get('user'), 
                        projectId: this.get('project.uuid'),
                        projectJson: this.get('project')
                    }
                ).done(function(user) {
                    //TODO show save success
               }).error(function(){
                Ember.Logger.log('error occur');
            });
        }*/
    }
});