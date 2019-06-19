const Customer = require('../model/appModel.js');
const utils = require('../Utils');

exports.list_all_customers = function(req, res) {
  Customer.getAllCustomers(function(err, customer) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', customer);
    res.send(customer);
  });
};

exports.add_customer = function(req, res) {
    var new_customer = new Customer(req.body);
    if(!new_customer.idcustomers){
        res.status(400).send({ error:true, message: 'Please provide customer/status' });
    }
    else{
      Customer.addNewCustomer(new_customer, function(err, customer) {
        if (err){
          res.send(err);
        }
        res.json(customer);
      });
    }
};

exports.update_customer = function(req, res) {
  const changedData = utils.cleanProperties(new Customer(req.body));
  
  Customer.updateById(req.params.customerId, changedData, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.list_all_teachers = function(req, res) {
  Customer.getAllTeachers(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};

exports.delete_customer = function(req, res) {
  console.log('ssssssssssssss');
  // Customer.remove( req.params.customerId, function(err, data) {
  //   if (err)
  //     res.send(err);
  //   res.json({ message: 'Customer successfully deleted' });
  // });
};