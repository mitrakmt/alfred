const Router = require('express').Router();
const db = require('./db');
const User = require('./db/User');
const Middleware = require('./middleware');
const Promise = require('bluebird');

  Router.route('/signup')
    .post(Middleware.checkEmailValidity, Middleware.hashPass, Middleware.createToken, function(req, res) {
      User.create(req.body, function (err, result) {
        if (err) {
          res.err(err)
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

  Router.route('/news')
    // Accepts array of stocks through req.body.news, returns 6 stories
    .get(function (req, res) {
      res.status(200).send("Here's yo news!")
    })

  // -- newsapi.org
  // -- dev.markitondemand.com

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
    .delete(function (req, res) {
      new Promise(() => {
        console.log("Inside first promise of /delete")
        User.findOne({email: 'nick.mitrakos@gmail.com'})
      })
      .then((user) => {
        console.log("Inside seconds deleting stocks of ", req.body.stocks)
        // Check to see if any of those stocks are included.
        let stocks = req.body.stocks;
        _.each(stocks, (stock) => {
          _.remove(user.stocks, stock)
        });
        user.save();
        res.status(200).send("Deleted stocks from database");
      })
    })


module.exports = Router;
