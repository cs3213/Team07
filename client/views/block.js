App.BlockView = Ember.View.extend({
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
    
    setting: Ember.computed.alias('content.setting'),

    didInsertElement: function() {
        var view = this;

        console.log(this.get('content'));

        this.$().addClass('block-' + this.get('content.level') + '-' + this.get('content.idx'));

        this.$().data('type', this.get('content.type'));
        this.$().data('setting', this.get('content.setting'));

        this.$().find('input').val(this.get('content.setting'));
        this.$().find('select').val(this.get('content.setting'));

        this.$().find('.control-list').sortable({
            placeholder: 'ui-state-highlight',
            receive: function(event, ui) {
                sortableIn = 1;
            },
            over: function(event, ui) {
                sortableIn = 1;
            },
            out: function(event, ui) {
                sortableIn = 0;
            },
            beforeStop: function(event, ui) {
                if (sortableIn === 0) {
                    ui.item.remove();
                }
            }
        }).on('sortupdate', function(event, ui) {
            view.$('ui-sortable').trigger('sortupdate');
        });
    },

    templateName: function() {
        return 'blocks/' + this.get('content.type');
    }.property()
});