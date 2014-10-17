App.Project = DS.Model.extend({
    title: DS.attr('string', { defaultValue: 'Untitled Project' }),
    author: DS.belongsTo('user'),
    //created_at: DS.attr('moment-date'),
    //updated_at: DS.attr('moment-date'),
    // # the following are embedded documents in MongoDB
    script: DS.attr('array'),
    stage: DS.belongsTo('stage')
});