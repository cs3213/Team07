App.ProjectController = Ember.ObjectController.extend({
    actions: {
        play: function() {
            Ember.Logger.log('Play not implemented yet.');
        },
        stop: function() {
            Ember.Logger.log('Stop not implemented yet.');
        },
        
        selectBackground: function(background) {
            this.set('stage.background', background);
        },
        selectCostume: function(costume) {
            this.set('stage.character.costume', costume);
        }
    }
});