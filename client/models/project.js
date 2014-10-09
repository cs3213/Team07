var Project = DS.Model.extend({
    uuid: DS.attr('string'),
    title: DS.attr('title', { defaultValue: '' }),
    author: DS.belongsTo('user', { async: true }),
    created_at: DS.attr('moment-date'),
    updated_at: DS.attr('moment-date'),
    // # the following are embedded documents in MongoDB
    blocks: DS.hasMany('block', { async: true }),
    stage: DS.belongsTo('stage', { async: true })
});