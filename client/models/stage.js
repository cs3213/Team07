var Stage = DS.Model.extend({
    uuid: DS.attr('string'),
    background: DS.attr('string'),
    project: DS.belongsTo('project', { async: true }),
    character: DS.belongsTo('character', { async: true })
});