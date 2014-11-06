App.BlockLibraryView = Ember.View.extend({
    templateName: 'blockLibrary',
    tagName: 'section',

    blockListView: Ember.CollectionView.extend({
        didInsertElement: function() {
            this.$().find('> li').draggable({
                helper: 'clone',
                revert: 'invalid',
                connectToSortable: '.script-area, .control-list',
                appendTo: 'body',
                cursorAt: { left: 0, top: 0 }
            });
            this.$().find('input, select').attr('disabled', 'disabled');
        },

        willDestroyElement: function() {
            this.$().find('li').draggable('destroy');
        },

        content: [
            { type: 'setX', numVariable: [{ type: 'numberInput', setting: 0 }] },
            { type: 'setY', numVariable: [{ type: 'numberInput', setting: 0 }] },
            { type: 'move', numVariable: [{ type: 'numberInput', setting: 10 }] },
            { type: 'showCharacter' },
            { type: 'hideCharacter' },
            { type: 'changeBackground', setting: 'geometry2.png' },
            { type: 'changeCostume', setting: 'Bard.gif' },
            { type: 'repeat', numVariable: [{ type: 'numberInput', setting: 10 }]},
            { type: 'if' },
            { type: 'forever' },
            { type: 'whenSpriteClicked' },
        ],

        tagName: 'ul',
        classNames: ['block-library', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['type:data-type', 'setting:data-setting'],

            // @TODO: Move this to server call
            backgrounds: [
                { name: 'geometry', value: 'geometry2.png' },
                { name: 'restaurant', value: 'restaurant_icons.png' },
                { name: 'school', value: 'school.png' },
                { name: 'skulls', value: 'skulls.png' },
                { name: 'small steps', value: 'small_steps.png' },
            ],

            costumes: [
                { name: 'Bard', value: 'Bard.gif' },
                { name: 'Black Mage', value: 'BlackMage.gif' },
                { name: 'Dragoon', value: 'Dragoon.gif' },
                { name: 'Monk', value: 'Monk.gif' },
                { name: 'Ninja', value: 'Ninja.gif' },
                { name: 'Red Mage', value: 'RedMage.gif' },
                { name: 'Summoner', value: 'Summoner.gif' },
                { name: 'Warrior', value: 'Warrior.gif' },
                { name: 'WhiteMage', value: 'White Mage.gif' },
            ],

            templateName: function() {
                return 'blocks/' + this.get('content.type');
            }.property(),

            type: function() {
                return this.get('content.type');
            }.property(),

            // Create default settings for specific blocks
            setting: function() {
                return this.get('content.setting');
            }.property()
        })
    }),

    conditionListView: Ember.CollectionView.extend({
        didInsertElement: function() {
            this.$().find('li').draggable({
                helper: 'clone',
                revert: 'invalid',
                connectToSortable: '.condition-list',
                appendTo: 'body',
                cursorAt: { left: 0, top: 0 }
            });
            this.$().find('input, select').attr('disabled', 'disabled');
        },

        willDestroyElement: function() {
            this.$().find('li').draggable('destroy');
        },

        content: ['true', 'equal', 'greaterThan', 'lessThan'],

        tagName: 'ul',
        classNames: ['block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['type:data-type'],

            type: function() {
                return this.get('content');
            }.property(),

            templateName: function() {
                return 'conditions/' + this.get('content');
            }.property(),
        })
    }),

    variableListView: Ember.CollectionView.extend({
        didInsertElement: function() {
            this.$().find('li').draggable({
                helper: 'clone',
                revert: 'invalid',
                connectToSortable: '.variable-list',
                appendTo: 'body',
                cursorAt: { left: 0, top: 0 }
            });
            this.$().find('input, select').attr('disabled', 'disabled');
        },

        willDestroyElement: function() {
            this.$().find('li').draggable('destroy');
        },

        content: ['numberInput', 'spriteX', 'spriteY', 'mouseX', 'mouseY', 'stageWidth', 'stageHeight', 'plus', 'substract', 'multiply', 'divide', 'mod', 'random'],

        tagName: 'ul',
        classNames: ['block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['type:data-type', 'setting:data-setting'],

            type: function() {
                return this.get('content');
            }.property(),

            templateName: function() {
                return 'variables/' + this.get('content');
            }.property(),
        })
    })
});