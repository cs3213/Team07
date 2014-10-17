// fix for: https://github.com/emberjs/website/issues/629
App.Store = DS.Store.extend({
    adapter: 'DS.CustomRESTAdapter'
});

DS.CustomRESTAdapter = DS.RESTAdapter.extend({
    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
    })
});