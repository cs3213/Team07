App.ScriptView = Ember.View.extend({
    templateName: 'script',
    tagName: 'section',

    blockPlayed: function() {
        // Add CSS class to played block
        var idx = this.get('controller.playingBlock');
        this.$('.script-area li').removeClass('is-playing');

        if (idx >= 0) $(this.$('.script-area li').get(idx)).addClass('is-playing');
    }.observes('controller.playingBlock'),

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');
        this.$('.ui-sortable').sortable({
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
                if (sortableIn === 0)
                    ui.item.remove();
            }
        }).on('sortupdate', function(event, ui) {
            var scripts = {};

            $(this).find('li').each(function(index) {
                scripts[index] = {
                    'idx': index,
                    'type': $(this).data('type'),
                    'setting': $(this).data('setting')
                };
                $(this).attr('data-idx', index);
            });

            // Update model of script changes
            console.log(scripts);
            controller.set('model.script.blocks', scripts);
        });

        // Force change when setting changes
        this.$('.script-area').on('change', 'li input, li select', function(event) {
            $(this).closest('li').data('setting', $(this).val());
            // Trigger update from sortable
            $(this).closest('.script-area').trigger('sortupdate');
        });
    },

    scriptListView: Ember.CollectionView.extend({
        content: function() {

        }.property(),

        tagName: 'ul',
        classNames: ['ui-sortable', 'script-area', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],

            templateName: function() {
                return 'blocks/' + this.get('content.type');
            }
        })
    })
});