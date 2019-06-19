var sql = require('./db.js');
const utils = require('../Utils');

//Task object constructor
var Customer = function(data){
    let customer;
    if(Array.isArray(data)) {
        customer = data[0];
    } else {
        customer = data;
    }
    
    this.idcustomers = customer.idcustomers;
    this.name = customer.name;
    this.surname = customer.surname;
    this.patronym = customer.patronym;
    this.birthday = customer.birthday;
    this.email = customer.email;
    this.phone = customer.phone;
    this.lessons = customer.lessons;
    this.language = customer.language;
    this.work = customer.work;
};

Customer.addNewCustomer = function createUser(newCustomer, result) {
    // console.log(newCustomer);
    sql.query("INSERT INTO customers set ?", newCustomer, function (err, res) {
            
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};
// Customer.getTaskById = function createUser(taskId, result) {
//         sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {             
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     result(null, res);
              
//                 }
//             });   
// };
Customer.getAllCustomers = function getAllCustomers(result) {
    sql.query("Select * from customers", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Customers : ', res);  

            result(null, res);
        }
    });   
};

Customer.getAllTeachers = function getAllTeachers(result) {
    sql.query("Select * from teacher", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('Customers : ', res);  

            result(null, res);
        }
    });   
};
Customer.updateById = function(id, customerData, result) {
    // const queryStr = prepareUpdateQuery(id, customerData);

    const data = utils.parseObjToStringWithSeparte(customerData, "=");
    // console.log(data);
    // console.log(id)
    sql.query(`UPDATE customers SET ${data} WHERE idcustomers = ${id}`, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {   
            result(null, res);
        }
    }); 
};
Customer.remove = function(id, result){
    console.log(id);
    //  sql.query(`DELETE FROM customers WHERE id = ${id}`, function (err, res) {
    //     if(err) {
    //         console.log("error: ", err);
    //         result(null, err);
    //     }
    //     else{
        
    //         result(null, res);
    //     }
    // }); 
};

module.exports = Customer;