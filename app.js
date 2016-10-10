var express= require('express');
var todoController = require('./controllers/todoController');

var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//static files  assets route and public folder
//app.use('/assets',express.static('./public'))

app.use(express.static('./public'));
// localhost:3000/assets/style.css

//fire controllers
todoController(app);

//Listen to port
app.listen(3000);
console.log('server running on port 3000');
