App.StageView = Ember.View.extend({
    templateName: 'stage',
    tagName: 'section',

    background: Ember.computed.oneWay('controller.stage.background'),
    character: Ember.computed.alias('controller.stage.character'),

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller'),
            view = this;

        this.$('#stage-canvas').on('mousemove', function(evt) {
            controller.set('mouseX', evt.clientX);
            controller.set('mouseY', evt.clientY);
        });

        var stage = new Kinetic.Stage({
            container: 'stage-canvas',
            width: 470,
            height: 320
        });

        var layer = new Kinetic.Layer();

        if (view.get('character.visible')) {
            var imgObj = new Image();
            imgObj.onload = function() {
                var character = new Kinetic.Image({
                    image: imgObj,
                    x: view.get('character.x'),
                    y: view.get('character.y'),
                    draggable: true
                });

                character.on('dragend', function(event) {
                    controller.set('stage.character.x', character.x());
                    controller.set('stage.character.y', character.y());
                });

                layer.add(character);
                stage.add(layer);

                view.set('kStage', stage);
                view.set('kLayer', layer);
                view.set('kCharacter', character);

                view.renderCanvas.call(view);
            };
            imgObj.src = '/sprites/' + this.get('character.costume');
        }
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
        var view = this,
            character = this.get('kCharacter');

        var imgObj = new Image();
        imgObj.onload = function() {
            character.visible(view.get('character.visible'));
            character.x(view.get('character.x'));
            character.y(view.get('character.y'));

            character.image(imgObj);

            view.get('kLayer').draw();
        };
        imgObj.src = '/sprites/' + this.get('character.costume');
    },
});