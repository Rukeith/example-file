/**
 * LogsController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res){
		Logs.find({}).exec(function(err, logs){
			if(err){
				res.send(500, {error: 'Database Error'});
			}
			res.view('list', {logs: logs});
		});
	},
	add: function(req, res){
		return res.view('add');
	},
	create: function(req, res){
		var name = req.body.name;
		var text = req.body.text;

		Logs.create({name:name, text: text}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}
			res.redirect('/logs/list');
		});
	},
	delete: function(req,res){
		Logs.destroy({id:req.params.id}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}
			res.redirect('/logs/list');
		});
		return false;
	}
};
