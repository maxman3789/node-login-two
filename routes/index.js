var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

router.post('/login', function(request, response, next) {
  var email = request.body.email;

  var password = request.body.password;

  if(email && password)
  {
    query = `
    SELECT * FROM users
    WHERE email = "${email}"
    `;
    // query = `
    //     SELECT * FROM user_login 
    //     WHERE user_email = "${user_email_address}"
    //     `;

    database.query(query, function(error, data){
      if(data.length > 0)
      {
        for(var count = 0; count < data.length; count++)
        {
          if(data[count].password == password)
          {
            request.session.id = data[count].id;

            response.redirect("/");
          }
          else
          {
            response.send('Incorrect Password');
          }
        }
      }
      else
      {
        response.send('Incorrect Email Address');
      }
      response.end();
    });
  }
  else
  {
    response.send('Please Enter Email Address and Password Details')
    response.end();
  }
})

router.get('/logout', function(request, response, next){
  request.session.destroy();

  response.redirect("/");


});

module.exports = router;
