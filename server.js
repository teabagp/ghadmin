const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = "1234";

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vladila100500',
    database: 'mydb'
});

mc.connect();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/Routes/appRoutes'); //importing route
routes(app); //register the route