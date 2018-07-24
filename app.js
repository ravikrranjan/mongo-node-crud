//app.js


const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;

const uri = 'mongodb://user-name:password@mlab-connection-string:45901/database';

mongoose.Promise = require('bluebird');
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => { //if all is ok we will be here
    console.log('Connected');
  })
  .catch(err => { //if error we will be here
    console.log('App starting error:', err.stack);
  });

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
// (node:10364) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.


const itemRouter = require('./src/routes/itemRoutes');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/items', itemRouter);

app.listen(port, function(){
  console.log('hello world');
})
app.get('/', function(req, res){
  res.send('Hello Express');
});
