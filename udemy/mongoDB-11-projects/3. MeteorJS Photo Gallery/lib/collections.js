Photos = new FS.Collection('Photos', {
  stores: [ new FS.Store.GridFS('Photos') ],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: message => FlashMessage.sendError(message)
    }
});

Photos.allow({
  insert: () => true,
  download: () => true
});
