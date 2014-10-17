App.ProjectSerializer = DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        author: { serialize: 'id' },
        script: { embedded: 'always' },
        stage: { embedded: 'always' }
    }
});