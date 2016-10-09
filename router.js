const Router = require('express').Router();
const db = require('./db');
const User = require('./db/User');
const Middleware = require('./middleware');
const Promise = require('bluebird');

  Router.route('/signup')
    .post(Middleware.checkEmailValidity, Middleware.hashPass, Middleware.createToken, function(req, res) {
      User.create(req.body, function (err, result) {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send(result)
        }
      })
    });

  Router.route('/logout')
    .post(Middleware.destroyToken, function (req, res) {
      res.status(200).send("You have successfully logged out");
    })

  Router.route('/login')
    .post(Middleware.checkPass, Middleware.createToken, function (req, res) {
      res.status(200).send("Login successful");
    });

  Router.route('/stocks')
    .get(Middleware.checkAuth, Middleware.getUserStocks, function (req, res) {
      res.status(200).send(req.session.user.stocks);
    })
    .post(Middleware.checkAuth, function (req, res) {
      new Promise(function () {
        User.findOne({email: req.session.user})
      })
      .then(function (user) {
        user.stocks.push(req.body.stockTicker);
        user.save();
      })
    })

module.exports = Router;
