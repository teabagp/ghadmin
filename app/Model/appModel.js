var sql = require('./db.js');

//Task object constructor
var User = function(user){
    this.user = user.user;
    this.status = user.status;
    this.created_at = new Date();
};
// Task.createTask = function createUser(newTask, result) {    
//         sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, res.insertId);
//                 }
//             });           
// };
// Task.getTaskById = function createUser(taskId, result) {
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
User.getAllTask = function getAllTask(result) {
        sql.query("Select * from users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};
// Task.updateById = function(id, task, result){
//   sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{   
//              result(null, res);
//                 }
//             }); 
// };
// Task.remove = function(id, result){
//      sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
               
//                  result(null, res);
//                 }
//             }); 
// };

module.exports= User;