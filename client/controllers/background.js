App.BackgroundController = Ember.Controller.extend({
    needs: 'project',

    selected: function() {
        return this.get('controllers.project.stage.background');
    }.property('selected'),

    actions: {
        'selectBackground': function(background) {
            this.set('selected', background);

            // Proprogate to parent controller
            return true;
        }
    }
});