//Luis E. Fernandez de la Vara
//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
require('dotenv').config();
const reload = require('livereload'); //  reload the server

//declare express
const app = express();

//declare port
const port = process.env.PORT || 5000;

console.log(process.env.MONGO_DB); 
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true  }).then(() => console.log(`Database connected successfully`)).catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

//declare middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
