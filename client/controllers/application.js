App.ApplicationController = Ember.Controller.extend({
    needs: ['project'],
    isLoggedIn: false,

    init: function () {
        this._super();

        var controller = this;
        controller.getSession();
    },

    getSession: function() {
        var controller = this,
            store = this.store;
        $.getJSON('/session').done(function(res) {
            var user = store.createRecord('user', res.user);
            controller.set('loggedInUser', user);
            controller.set('isLoggedIn', true);
        }).error(function(res) {
            Ember.Logger.log('Error checking session.');
        });
    },

    actions: {
        newProject: function() {
            this.get('controllers.project').send('new');
        },
        saveProject: function() {
            this.get('controllers.project').send('save');
        },
        loadProject: function() {
            this.get('controllers.project').send('load');
        },
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
        }
    }
});