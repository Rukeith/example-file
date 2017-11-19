var keystone = require('keystone');

exports = module.exports = function(req, res){
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'offices';
  locals.filters = {
    office: req.params.office
  }
  locals.data = {
    offices:[]
  }

  view.on('init', function(next){
    var q = keystone.list('Office').model.findOne({
      slug: locals.filters.office
    });

    q.exec(function(err, result){
      locals.data.office = result;
      next(err);
    });
  });

  // Render view
  view.render('office');
}
