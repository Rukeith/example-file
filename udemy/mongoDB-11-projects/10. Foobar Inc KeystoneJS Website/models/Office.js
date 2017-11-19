var keystone= require('keystone');
var Types = keystone.Field.Types;

var Office = new keystone.List('Office', {
  map: {name: 'title'},
  autokey: {path: 'slug', from: 'title', unique: true}
});

Office.add({
  title: {type: String, required: true},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  employees: {type: String},
  info: {type: Types.Html, wysiwyg: true, height: 200},
  image: {type: Types.CloudinaryImage},
  publishedDate: {type: Date, default: Date.now}
});

Office.register();
