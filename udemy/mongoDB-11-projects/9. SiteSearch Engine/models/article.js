var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');

// Article Schema
var articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  description:{
    type: String
  },
  author:{
    type: String
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

articleSchema.plugin(searchPlugin, {
  fields: ['title', 'description', 'url']
});

var Article = module.exports = mongoose.model('Article', articleSchema);

module.exports.searchArticles = function(searchText, callback){
  Article.search(searchText, {title:1, description:1, url:1}, {
    conditions:{title:{$exists: true}, description:{$exists: true}, url:{$exists: true}},
    sort: {title:1},
    limit:50
  }, callback);
}

module.exports.addArticle= function(article, callback){
  Article.create(article, callback);
}
