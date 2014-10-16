App.ProjectController = Ember.ObjectController.extend(Ember.Evented, {
    isPlaying: false,
    isStopped: Ember.computed.not('isPlaying'),

    playingBlock: -1,

    actions: {
        play: function() {
            Ember.Logger.log('Playing script.');

            this.set('isPlaying', true);
            var controller = this,
                blocks = this.get('script.blocks'),
                length = Object.keys(blocks).length;


            // Stop if there's nothing on the script block.
            if (length === 0) {
                setTimeout(function() {
                    controller.send('stop');
                }, 1000);
                return;
            }

            $.each(blocks, function(index, block) {
                setTimeout(function() {
                    //console.log(block);
                    controller.set('playingBlock', index);

                    switch (block.type) {
                        case 'setX':
                            controller.send('setCharacterX', block.setting);
                            break;
                        case 'setY':
                            controller.send('setCharacterY', block.setting);
                            break;
                        case 'move':
                            controller.send('setCharacterX', parseInt(controller.get('stage.character.x'), 10) + parseInt(block.setting, 10));
                            break;
                        case 'showCharacter':
                            controller.send('setCharacterVisible', true);
                            break;
                        case 'hideCharacter':
                            controller.send('setCharacterVisible', false);
                            break;
                    }
                }, 1000 * index);
            });

            // End the script
            setTimeout(function() {
                controller.send('stop');
            }, length * 1000);
        },
        stop: function() {
            Ember.Logger.log('Stopping script.');
            this.set('playingBlock', -1);
            this.set('isPlaying', false);
        },
        
        selectBackground: function(background) {
            this.set('stage.background', background);
        },
        selectCostume: function(costume) {
            this.set('stage.character.costume', costume);
        },
        setCharacterX: function(x) {
            this.set('stage.character.x', x);
        },
        setCharacterY: function(y) {
            this.set('stage.character.y', y);
        },
        setCharacterVisible: function(visible) {
            this.set('stage.character.visible', visible);
        }
    }
});