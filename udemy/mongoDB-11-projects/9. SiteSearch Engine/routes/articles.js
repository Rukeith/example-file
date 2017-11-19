var express = require('express');
var router = express.Router();

Article = require('../models/article');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
  res.render('add_article');
});

router.post('/add', function(req, res, next) {
  var article = new Article();
  article.title = req.body.title;
  article.url = req.body.url;
  article.author = req.body.author;
  article.description = req.body.description;

  Article.addArticle(article, function(err, article){
    if(err){
      console.log(err);
      res.send(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
