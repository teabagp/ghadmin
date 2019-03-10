var User = require('../model/appModel.js');

exports.list_all_users = function(req, res) {
    User.getAllTask(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};