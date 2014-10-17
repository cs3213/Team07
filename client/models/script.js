App.Script = DS.Model.extend({
    uuid: DS.attr('string'),
    project: DS.belongsTo('project'),
    blocks: DS.hasMany('block', { async: true })
});