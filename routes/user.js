 var connection = require('../config/db');

module.exports = (app) => {

  app.get('/',function(req,res,next){
    res.render('index',{title: 'Index '});
  });

  app.get('/signup',(req,res) => {
    res.render('user/signup',{title: 'SignUp'});
  });

  app.get('/login',(req,res) => {
    res.render('user/login',{title: 'Login '});
  });

  app.post('/signup',(req, res) => {
     message = '';
     if(req.method == "POST"){
        var post  = req.body;
        var name= post.fullname;
        var pass= post.password;
        var email=post.email;

        var sql = "INSERT INTO `User`(`name`,`Email`, `Password`) VALUES ('" + name + "','" + email+ "','" + pass + "')";

        var query = connection.query(sql, function(err, result) {

           // message = "Succesfully! Your account has been created.";
           // res.render('signup.ejs',{message: message});
           res.render('user/login');
        });

     } else {
        res.render('user/signup');
     }
  });

  app.post('/login',(req, res) => {
     var message = '';
     var sess = req.session;

     if(req.method == "POST"){
        var post  = req.body;
        var name= post.fullname;
        var email=post.email;
        var pass= post.password;

        var sql="SELECT *FROM `User` WHERE `Email`='"+email+"' and Password = '"+pass+"'";
        connection.query(sql,(err, result) => {
              console.log(result);
              if(result.length){
              req.session.userId = result[0].UserID;
              req.session.user = result[0];
              console.log(result[0].UserID);
              res.render('user/profile',{data:result});

           }
           else{
              message = 'Wrong Credentials.';
              res.render('user/login',{message: message});
            return res.send('error1');
           }
        });
     } else {
       res.render('user/login',{message: message});
        return res.send('error2');
     }
     //cartRoute
     app.get('/addtocart/:id',(req,res)=>{
       var prodId= req.params.id;
       var userId=req.session.userId;
       var sql = "INSERT INTO `Cart`(`UserID`,`ProductID`) VALUES ('" + userId + "','" + prodId + "')";
       connection.query(sql,(err, result) => {
             console.log('Added to cart');
            //res.render('user/profile'{data:result});

          });
        });

     });

    app.get('/logout',(req,res) => {
    req.session.destroy(function(err) {
      if(err) throw err;
      else {
      res.redirect("/");
      }
  })
});
// app.post('/addtocart',(req,res) => {
//   console.log(req.body);
//   console.log('added');
// });
}

//-----------------------------------------------dashboard page functionality----------------------------------------------
//
// exports.dashboard = function(req, res, next){
//
//    var user =  req.session.user,
//    userId = req.session.userId;
//    console.log('ddd='+userId);
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }
//
//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
//
//    db.query(sql, function(err, results){
//       res.render('dashboard.ejs', {user:user});
//    });
// };
// //------------------------------------logout functionality----------------------------------------------
// exports.logout=function(req,res){
//    req.session.destroy(function(err) {
//       res.redirect("/login");
//    })
// };
// //--------------------------------render user details after login--------------------------------
// exports.profile = function(req, res){
//
//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }
//
//    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
//    db.query(sql, function(err, result){
//       res.render('profile.ejs',{data:result});
//    });
// };
// //---------------------------------edit users details after login----------------------------------
// exports.editprofile=function(req,res){
//    var userId = req.session.userId;
//    if(userId == null){
//       res.redirect("/login");
//       return;
//    }
//
//    var sql="SELECT * FROM `User` WHERE `id`='"+userId+"'";
//    db.query(sql, function(err, results){
//       res.render('edit_profile.ejs',{data:results});
//    });
// };
