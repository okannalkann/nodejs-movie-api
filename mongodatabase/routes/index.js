var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  const { username, password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {
      const user = new User({
        username,
        password: hash
      });
    
      const promise = user.save();

      promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });
  });
});

router.post('/authenticate', function(req, res, next) {
  const { username, password} = req.body;

  User.findOne({
    username,
  }, (err, user) => {
    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: 'Authenticate failed, user not found!'
      });
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: 'Authenticate failed, password is wrong'
          })
        }else{
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat 
          });
          
          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
});

module.exports = router;
