module.exports = function(app) {
  var list = require('../Controller/appController');

  // todoList Routes
  app.route('/customers')
    .get(list.list_all_customers)
    .post(list.add_customer);

  app.route('/customers/:customerId')
    // .get(list.list_all_customers)
    .put(list.update_customer)
    .delete(list.delete_customer);

  app.route('/teachers')
    .get(list.list_all_teachers);
  
    // .post(todoList.create_a_task);
   
  //  app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
  };