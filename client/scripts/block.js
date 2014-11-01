/**
 * Class to handle block logic (when it's played).
 */
App.Block = Ember.Object.extend({
    play: function(controller, done) {
        controller.set('playingBlock', 'block-' + this.level + '-' + this.idx);
    }
});

App.SetXBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterX', this.setting);
        done();
    }
});

App.SetYBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterY', this.setting);
        done();
    }
});

App.MoveBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterX', parseInt(controller.get('stage.character.x'), 10) + parseInt(this.setting, 10));
        done();
    }
});

App.ShowCharacterBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterVisible', true);
        done();
    }
});

App.HideCharacterBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterVisible', false);
        done();
    }
});

App.ChangeCharacterBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('selectBackground', this.setting);
        done();
    }
});

App.ChangeCostumeBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('selectCostume', this.setting);
        done();
    }
});