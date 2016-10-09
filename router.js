const Router = require('express').Router();
const db = require('./db');
const User = require('./db/User');
const Middleware = require('./middleware');
const Promise = require('co');
const _ = require('lodash');

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

  Router.route('/news/:stockId')
    .get(function (req, res) {
      let stockTicker = req.params.stockId;
      // query the news api for the stock passed in on req.params.stockId
      res.status(200).send("Here's your news of ", stockTicker)
    })

  Router.route('/news')
    .get(function (req, res) {
      // grabs stock tickers from user profile, then queries those stocks for news
      res.status(200).send("Here's yo news curated from your stock list")
    })

  // -- newsapi.org
  // -- dev.markitondemand.com

  Router.route('/stocks')
    .get(Middleware.checkAuth, Middleware.getUserStocks, function (req, res) {
      res.status(200).send(req.session.user.stocks);
    })
    .post(function (req, res) {
      Promise(function* () {
        return User.findOne({email: 'nick.mitrakos@gmail.com'})
      })
      .then(function (user) {
        let stock = req.body.stockTicker;
        if (_.includes(user.stocks, stock)) {
          res.status(401).send("That stock is already in the list");
        }
        user.stocks.push(stock);
        user.save();
        res.status(200).send("Added stock ticker")
      })
    })
    .delete(function (req, res) {
        Promise(function* () {
          return User.findOne({email: 'nick.mitrakos@gmail.com'})
        })
        .then(function (user) {
          let stock = req.body.stock;
          let stockIndex = user.stocks.indexOf(stock)
          _.pullAt(user.stocks, stockIndex)

          // Save isn't currently working
          user.save(function (err) {
              if(err) {
                  console.error('ERROR!');
              }
          });
        });

        res.status(200).send("Deleted stocks from database");
      })


module.exports = Router;
