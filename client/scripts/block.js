/**
 * Class to handle block logic (when it's played).
 */
App.Block = Ember.Object.extend({
    play: function(controller, done) {
        controller.set('playingBlock', 'block-' + this.level + '-' + this.idx);
    },
    numValue: function(controller, numData) {
        if (typeof numData === 'undefined')
            return 0;

        var numClass = numData.type.charAt(0).toUpperCase() + numData.type.slice(1) + 'Variable',
            num = App[numClass].create(numData);

        return num.value(controller);
    },
});

App.SetXBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterX', this.numValue(controller, this.numVariable[0]));
        done();
    }
});

App.SetYBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterY', this.numValue(controller, this.numVariable[0]));
        done();
    }
});

App.MoveBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);
        controller.send('setCharacterX', parseInt(controller.get('stage.character.x'), 10) + parseInt(this.numValue(controller, this.numVariable[0]), 10));
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

App.ChangeBackgroundBlock = App.Block.extend({
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