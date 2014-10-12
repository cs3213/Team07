App.ScriptView = Ember.View.extend({
    templateName: 'script',
    tagName: 'section',

    /**
     * Called when the element of the view has been inserted into the DOM.
     */
    didInsertElement: function() {
        var controller = this.get('controller');
        this.$('.script-area').sortable({
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
            });

            // Update model of script changes
            console.log(scripts);
            controller.set('model.script.blocks', scripts);
        });

        // Force change when setting changes
        this.$('.script-area').on('change', 'li input', function(event) {
            $(this).closest('li').data('setting', $(this).val());
            // Trigger update from sortable
            $(this).closest('.script-area').trigger('sortupdate');
        });
    },

    scriptListView: Ember.CollectionView.extend({
        content: function() {

        }.property(),

        tagName: 'ul',
        classNames: ['script-area', 'block-list', 'clearfix'],
        itemViewClass: Ember.View.extend({
            attributeBindings: ['content:data-type', 'setting:data-setting'],
            templateName: function() {
                return 'blocks/' + this.get('content.type');
            }
        })
    })
});