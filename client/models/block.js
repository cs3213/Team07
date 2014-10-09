var Block = DS.Model.extend({
    uuid: DS.attr('string'),
    order: DS.attr('number'),
    type: DS.attr('string'),
    setting: DS.attr()
});