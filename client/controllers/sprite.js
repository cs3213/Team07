App.SpriteController = Ember.Controller.extend({
    needs: 'project',

    selected: function() {
        return this.get('controllers.project.stage.character.costume');
    }.property('selected'),

    actions: {
        'selectCostume': function(sprite) {
            this.set('selected', sprite);

            // Proprogate to parent controller
            return true;
        }
    }
});