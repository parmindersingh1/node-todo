var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds033986.mlab.com:33986/shaktiman');

//Create a schema - this lis like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a todo model
var Todo = mongoose.model('Todo', todoSchema);
//Create item
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'Kick some coding'}];

//middleware
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/todo', function(req, res) {
  // res.render('todo',{todos: data});
  //get data from mongodb and pass it to view
  Todo.find({}, function(err, data) {
    if(err) throw err;
    res.render('todo',{todos: data});
  });
});

app.post('/todo',urlencodedParser, function(req, res) {
  //get data from view and added to mongodb
  var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
  });

  // data.push(req.body);
  // res.json(data);
});

app.delete('/todo/:item', function(req, res) {
  // delete requeted item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data) {
    if(err) throw err;
    res.json(data);
  });
  // data = data.filter(function(todo){
  //   return todo.item.replace(/ /g,'-') !== req.params.item;
  // });
  // res.json(data);
});


};
