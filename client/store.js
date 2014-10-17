// fix for: https://github.com/emberjs/website/issues/629
App.Store = DS.Store.extend();

DS.RESTAdapter.reopen({
    serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
    })
});