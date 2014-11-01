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
            this.send('stop');
            this.set('model', project);
            Bootstrap.NM.push('A new project has been created.', 'info');
        },
        save: function() {
            this.send('stop');
            var store = this.store,
                project = this.get('model');

            // set author first...
            project.set('author', this.get('controllers.application.loggedInUser'));

            project.save().then(function(project) {
                Bootstrap.NM.push('Project has been successfully saved.', 'success');
            }, function(project) {
                Bootstrap.NM.push('There seems to be a problem saving the project. Oops.', 'warning');
            });
        },
        load: function() {
            this.send('stop');
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
                Bootstrap.NM.push('Project has been successfully loaded.', 'success');
            }).error(function(res) {
                Ember.Logger.log('Error loading project.');
                Bootstrap.NM.push('There seems to be a problem loading the project. Oops.', 'warning');
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
                currentIdx = 0;

            var blockDone = function() {
                currentIdx++;
                controller.set('playTimeout', setTimeout(playBlock, controller.get('delay')));
            };

            var playBlock = function() {
                var bData = currentIdx >= length ? null: blocks[currentIdx];
                if (bData === null) {
                    setTimeout(function() {
                        controller.send('stop');
                    }, controller.get('delay') / 2);
                } else {
                    var blockClass = bData.type.charAt(0).toUpperCase() + bData.type.slice(1) + 'Block',
                        block = App[blockClass].create(bData);
                    block.play(controller, blockDone);
                }
            };

            playBlock();
        },
        stop: function() {
            Ember.Logger.log('Stopping script.');
            this.set('playingBlock', null);
            this.set('isPlaying', false);

            // Clear timeouts
            clearTimeout(this.get('playTimeout'));

            // Reset
            if (typeof this.get('startBackground') !== 'undefined' && this.get('startBackground') !== null)
                this.send('selectBackground', this.get('startBackground'));
            
            if (typeof this.get('startCostume') !== 'undefined' && this.get('startCostume') !== null)
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