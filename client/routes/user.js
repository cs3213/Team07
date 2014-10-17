App.UserRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('user')[0];
    }
});