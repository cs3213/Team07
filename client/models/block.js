var Block = DS.Model.extend({
    uuid: DS.attr('string'),
    idx: DS.attr('number'),
    type: DS.attr('string'),
    setting: DS.attr(),
    script: DS.belongsTo('script')
});