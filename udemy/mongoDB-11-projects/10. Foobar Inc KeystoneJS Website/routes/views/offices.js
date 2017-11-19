var keystone = require('keystone');

exports = module.exports = function(req, res){
  var view = new keystone.View(req, res);
  var locals = res.locals;

  //Set locals
  locals.section='offices'

  // Load offices
  view.query('offices', keystone.list('Office').model.find());

  // Show view
  view.render('offices');
}
