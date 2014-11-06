App.StageView = Ember.View.extend({
    templateName: 'stage',
    tagName: 'section',

    background: Ember.computed.oneWay('controller.stage.background'),
    character: Ember.computed.alias('controller.stage.character'),

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');

        this.$('#stage-canvas').on('mousemove', function(evt) {
            controller.set('mouseX', evt.clientX);
            controller.set('mouseY', evt.clientY);
        });

        this.renderCanvas();
    },

    /**
     * Binds with character on the project.
     */
    characterUpdated: function() {
        this.renderCanvas();
    }.observes('controller.stage.character.costume', 'controller.stage.character.x', 'controller.stage.character.y', 'controller.stage.character.visible'),

    mouseX: function() {
        return this.get('controller.mouseX');
    }.property('controller.mouseX'),

    mouseY: function() {
        return this.get('controller.mouseY');
    }.property('controller.mouseY'),

    backgroundStyle: function() {
        return 'background: url(background/' + this.get('controller.stage.background') + ') repeat center center';
    }.property('controller.stage.background'),

    renderCanvas: function() {
        var c = this.$('#stage-canvas')[0],
            ctx = c.getContext('2d'),
            view = this;

        // clear canvas
        c.width = c.width;

        if (view.get('character.visible')) {
            var imgObj = new Image();
            imgObj.onload = function() {
                ctx.drawImage(imgObj, view.get('character.x'), view.get('character.y'));
            };
            imgObj.src = '/sprites/' + this.get('character.costume');
        }
    },
});