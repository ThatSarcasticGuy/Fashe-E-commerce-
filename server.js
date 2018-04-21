var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);


var flash = require('connect-flash');
var fs = require('fs');
var expressValidator = require('express-validator');

 var routes = require('./routes')
  , user = require('./routes/user');

var app = express();
 var connection = require('./config/db');

 connection.connect(function(err) {
   if(err) {
   console.log(err);
   console.log('Unable to connect to MySQL');
    process.exit(1);
  }
});

global.db = connection;

app.use(expressValidator());
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('public'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: new MySQLStore({
    host:'localhost',
    port:3306,
    user:'root',
    password:'vibhor5598',
    database:'mydb'
  })
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParamn += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

//Connect flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


require('./routes/user')(app);

app.set('port', (process.env.PORT || 3000));

app.listen(3000,function(){
  console.log('Listening on port 3000');
});
