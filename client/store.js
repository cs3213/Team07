// fix for: https://github.com/emberjs/website/issues/629
App.Store = DS.Store.extend();

DS.RESTAdapter.reopen({
    namespace: 'api/1',
    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
    })
});