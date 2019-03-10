module.exports = function(app) {
  var list = require('../Controller/appController');

  // todoList Routes
  app.route('/users')
    .get(list.list_all_users)
    // .post(todoList.create_a_task);
   
  //  app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
  };