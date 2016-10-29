let Users = require('../db/User')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let Helpers = require('../helpers')
let userController = {}

userController.SIGNUP = (req, res) => {
  let valid = Helpers.checkEmailValidity(req.body.email)
  if (valid) {
    return res.status(400).send('User with that email already exists')
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.status(500).send('Password hashing error')
      } else {
        Users.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
        .then((user) => {
          var token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (600 * 600) }, 'Alfred is da bomb')

          res.status(200).header('Auth', token).header('currentUser', user.id).send({ token: token, user: user.id, name: user.name })
        })
        .catch((err) => {
          res.status(500).send(err)
        })
      }
    })
  })
}

userController.SIGNIN = (req, res) => {
  Users.findOne({
    'email': req.body.email
  })
  .then((user) => {
    let equal = Helpers.comparePassword(req.body.password, user.password)

    if (equal) {
      let token = jwt.sign({ email: req.body.email, expiresIn: Math.floor(Date.now() / 1000) + (600 * 600) }, 'Alfred is da bomb')

      res.status(200).header('Auth', token).header('currentUser', user.id).send({ token: token, id: user.id, name: user.name })
    } else {
      res.status(400).send('Invalid email or password')
    }
  })
}

userController.EDIT = (req, res) => {
  Users.findOne({
    '_id': req.headers.id
  })
  .then((user) => {
    if (req.body.name) {
      user.name = req.body.name
      user.save((err, user) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(user)
      })
    }

    if (req.body.email) {
      user.email = req.body.email
      user.save((err, user) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(user)
      })
    }

    if (req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          user.password = hash
          user.save((err, user) => {
            if (err) {
              res.status(500).send(err)
            }
            res.status(200).send(user)
          })
        })
      })
    }
  })
}

userController.DELETE = (req, res) => {
  Users.find({
    '_id': req.headers.id
  })
  .remove().exec()

  res.status(200).send('User deleted successfully')
}

module.exports = userController
