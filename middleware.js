const bcrypt = require('bcrypt');
const express = require('express');
const Middleware = express.Router()
const User = require('./db/User');

Middleware.checkAuth = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(400).send("You must log in to view this content")
  }
}

Middleware.hashPass = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      res.err(err);
    } else {
      req.body.password = hash;
      next();
    }
  });
}

Middleware.checkEmailUsed = function (req, res, next) {
  User.findOne({"email": req.body.email}, function (err, result) {
    if (result !== null) {
      res.status(400).send("That email has already been used")
    } else {
      next()
    }
  });
}

Middleware.checkPass = function (req, res, next) {
  User.findOne({"email": req.body.email}, function (err, result) {
    bcrypt.compare(req.body.password, result.password, function(err, response) {
        if (err) {
          console.log(err)
          res.err(err)
        } else if (response) {
          next();
        } else {
          res.status(400).send("Passwords don't match, will redirect somewhere");
        }
    });
  })
}

Middleware.createToken = function (req, res, next) {
  req.session.regenerate(function(err) {
    if (err) {
      res.err(err)
    } else {
      req.session.user = req.body.email;
      next();
    }
  });
}

Middleware.destroyToken = function (req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      res.err(err)
    } else {
      next();
    }
  });
}

Middleware.getUserStocks = function (req, res, next) {
  User.findOne({"email": req.body.email}, function (err, user) {
    if (err) {
      res.err(err)
    } else {
      res.status(200).send(req.session.stocks);
      next();
    }
  })
}


module.exports = Middleware;