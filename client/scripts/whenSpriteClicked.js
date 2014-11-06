App.WhenSpriteClickedBlock = App.Block.extend({
    play: function(controller, done) {
        this._super(controller, done);

        var $this = this;

        var blocks = this.children,
            length = Object.keys(blocks).length - 1,
            currentIdx = 0,
            currentIter = 0;

        var blockDone = function() {
            currentIdx++;
            controller.set('playTimeout', setTimeout(playBlock, controller.get('delay')));
        };

        var playBlock = function() {
            var bData = currentIdx >= length ? null: blocks[currentIdx];
            if (bData === null) {
                done();
            } else {
                var blockClass = bData.type.charAt(0).toUpperCase() + bData.type.slice(1) + 'Block',
                    block = App[blockClass].create(bData);
                block.play(controller, blockDone);
            }
        };

        controller.one('spriteClicked', function() {
            playBlock();
        });
    }
});