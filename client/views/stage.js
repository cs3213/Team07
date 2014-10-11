App.StageView = Ember.View.extend({
    templateName: 'stage',

    background: Ember.computed.oneWay('controller.stage.background'),
    backgroundStyle: function() {
        return 'background: url(background/' + this.get('controller.stage.background') + ') repeat center center';
    }.property('controller.stage.background')
});