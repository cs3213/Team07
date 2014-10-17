App.ProjectController = Ember.ObjectController.extend(Ember.Evented, {
    needs: ['application', 'background', 'sprite'],

    isPlaying: false,
    isStopped: Ember.computed.not('isPlaying'),

    delay: 1000,

    playTimeout: null,
    playingBlock: null,

    actions: {
        new: function() {
            var store = this.store,
                project = store.createRecord('project', {
                script: [],
                stage: store.createRecord('stage', {
                    character: store.createRecord('character')
                })
            });
            this.set('model', project);
        },
        save: function() {
            var store = this.store,
                project = this.get('model');

            // set author first...
            project.set('author', this.get('controllers.application.loggedInUser'));

            project.save();
        },
        load: function() {
            // cheat a bit...
            var controller = this,
                store = this.store;
            $.getJSON('/projects').done(function(res) {
                var project = store.createRecord('project', {
                    script: res.project.script,
                    stage: store.createRecord('stage', {
                        background: res.project.stage.background,
                        character: store.createRecord('character', res.project.stage.character)
                    })
                });
                controller.set('model', project);
            }).error(function(res) {
                Ember.Logger.log('Error loading project.');
            });
        },
        play: function() {
            Ember.Logger.log('Playing script.');

            this.set('isPlaying', true);

            this.set('startBackground', this.get('stage.background'));
            this.set('startCostume', this.get('stage.character.costume'));

            var controller = this,
                blocks = this.get('script'),
                length = Object.keys(blocks).length - 1,
                blockStack = [],
                blockLimits = [];

            function playBlock() {
                var currentIdx = blockStack[blockStack.length - 1],
                    timeout;

                // Get the current block.
                var b = blocks;
                for (var i = 0; i < blockStack.length; i++) {
                    if (i === 0)
                        b = blockStack[i] >= length ? null : blocks[blockStack[i]];
                    else
                        b = blockStack[i] >= Object.keys(b.children).length - 1 ? null : b.children[blockStack[i]];
                }

                if (b === null) {
                    // Reached the end of the level.
                    if (blockStack.length <= 1) {
                        setTimeout(function() { controller.send('stop'); }, controller.get('delay') / 2);
                    } else {
                        blockStack.pop();
                        // move out to the previous level and continue if limit is reached
                        var threshold = blockLimits.pop();
                        //console.log(threshold);
                        if (threshold <= 0) {
                            currentIdx = blockStack.pop();
                            blockStack.push(currentIdx + 1);
                        } else {
                            blockLimits.push(threshold - 1);
                        }
                        
                        timeout = setTimeout(playBlock, controller.get('delay') / 2);
                        controller.set('playTimeout', timeout);
                    }
                } else {
                    // play the current block
                    // console.log(b);
                    
                    controller.set('playingBlock', 'block-' + b.level + '-' + b.idx);

                    switch (b.type) {
                        case 'setX':
                            controller.send('setCharacterX', b.setting);
                            break;
                        case 'setY':
                            controller.send('setCharacterY', b.setting);
                            break;
                        case 'move':
                            controller.send('setCharacterX', parseInt(controller.get('stage.character.x'), 10) + parseInt(b.setting, 10));
                            break;
                        case 'showCharacter':
                            controller.send('setCharacterVisible', true);
                            break;
                        case 'hideCharacter':
                            controller.send('setCharacterVisible', false);
                            break;
                        case 'changeBackground':
                            controller.send('selectBackground', b.setting);
                            break;
                        case 'changeCostume':
                            controller.send('selectCostume', b.setting);
                            break;
                    }

                    // if there's another level we push a block in as well
                    if (typeof b.children !== 'undefined' && Object.keys(b.children).length > 0) {
                        blockStack.push(0);
                        if (blockLimits.length !== blockStack.length - 1)
                            blockLimits.push(parseInt(b.setting - 1, 10));
                    } else {
                        // push the next block into the stack
                        blockStack.pop();
                        blockStack.push(currentIdx + 1);
                    }

                    // prep for next block
                    timeout = setTimeout(playBlock, controller.get('delay'));
                    controller.set('playTimeout', timeout);
                }
            }

            // Push the first block into the stack.
            blockStack.push(0);
            playBlock();
        },
        stop: function() {
            Ember.Logger.log('Stopping script.');
            this.set('playingBlock', null);
            this.set('isPlaying', false);

            // Clear timeouts
            clearTimeout(this.get('playTimeout'));

            // Reset
            this.send('selectBackground', this.get('startBackground'));
            this.send('selectCostume', this.get('startCostume'));
            this.send('setCharacterVisible', true);
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