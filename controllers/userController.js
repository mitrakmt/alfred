let Users = require('../db/User')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

let userController = {};

userController.GET = function(req, res) {
  res.status(200).send('Get to /user/');
};

userController.SIGNUP = function (req, res) {
  Middleware.hash
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.err(err)
    } else {
      req.body.password = hash

      Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(function(user) {
        var token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!');

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token:token, user: user.id, name: user.name  })
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
    }
  })
};

userController.SIGNIN = function (req, res) {
  Users.findOne({
    where: {
      "email": req.body.email
    }
  })
  .then(function (user) {
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        res.status(500).send(err)
      } else if (response !== null) {
        let token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!');

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token:token, user: user.id, name: user.name  })
      } else {
        res.status(400).send('Invalid email or password')
      }
    })
  })
}

userController.LOGOUT = function (req, res) {
  Users.findOne({
    where: {
      "email": req.body.email
    }
  })
  .then(function (user) {
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        res.status(500).send(err)
      } else if (response !== null) {
        let token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 'this is the secret token!');

        res.status(200).header('Auth', token).header('currentUser', user.id).send({ token:token, user: user.id, name: user.name  })
      } else {
        res.status(400).send('Invalid email or password')
      }
    })
  })
}

module.exports = userController;
