App.BlockLibraryView = Ember.View.extend({
    templateName: 'blockLibrary',
    tagName: 'section',

    blockListView: Ember.CollectionView.extend({
        didInsertElement: function() {
            this.$().find('li').draggable({
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

        defaultValues: {
            'setX': 0,
            'setY': 0,
            'move': 10,
            'showCharacter': 0,
            'hideCharacter': 0,
            'changeBackground': 'geometry2.png',
            'changeCostume': 'Bard.gif',
            'repeat': 10
        },

        content: ['setX', 'setY', 'move', 'showCharacter', 'hideCharacter', 'changeBackground', 'changeCostume', 'repeat', 'forever', 'if'],

        tagName: 'ul',
        classNames: ['block-library', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],

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
                return 'blocks/' + this.get('content');
            }.property(),

            // Create default settings for specific blocks
            setting: function() {
                return this.get('parentView.defaultValues.' + this.get('content'));
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

        content: ['spriteX', 'spriteY', 'mouseX', 'mouseY', 'stageWidth', 'stageHeight', 'plus', 'substract', 'multiply', 'divide', 'mod', 'random'],

        tagName: 'ul',
        classNames: ['block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['type:data-type'],

            type: function() {
                return this.get('content');
            }.property(),

            templateName: function() {
                return 'variables/' + this.get('content');
            }.property(),
        })
    })
});