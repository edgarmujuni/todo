var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('127.0.0.1');
var app = express();

var todoSchema = new mongoose.Schema({
  name: String, 
  status: {type: Boolean, default: false}
});

var Todo = mongoose.model('Todo', todoSchema);



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/todo', function(req, res){

  var todo = new Todo();
  todo.name = req.body.name;
  todo.save(function(err){
    if(err)res.send(err);
   res.status(200).send('item saved');
  });
});

app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if(err)res.send(err);
    res.status(200).send(todos);
  });
});

app.delete('/api/todo/tid', function(req, res){
    Todo.findOneAndRemove(req.params.tid, function(err){
    if(err)res.send(err);
    res.status(200).send('Item has been deleted');
  });
});

app.listen(8000);
console.log('magic happens at this port');