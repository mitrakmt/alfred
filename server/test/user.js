let chai = require('chai')
let express = require('express')
let server = require('../server')
let mongoose = require('mongoose')
let chaiHttp = require('chai-http')
let expect = chai.expect
let should = chai.should()
let User = require('../db/User')
let userController = require('../controllers/userController')
let assert = chai.assert

chai.use(chaiHttp)

describe('Users', () => {
  // Test for posting a user
  describe('POST /api/users/signup', () => {
    it('it should POST a new user', (done) => {
      let user = {
        name: 'Testing',
        email: 'test@test.com',
        password: 'testing!'
      }
      chai.request(server)
        .post('/api/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('token')
          res.body.should.have.property('user')
          res.body.should.have.property('name')
          done()
        })
    })
    // Test for deleting a user
    it('it should DELETE a user', (done) => {
      User.findOne({
        'email': 'test@test.com'
      })
      .then((user) => {
        let id = user._id
        chai.request(server)
          .delete('/api/users/delete')
          .set('id', id)
          .send()
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })
    it('It should signin a user', (done) => {
      let newUser = {
        email: 'testing@testing.com',
        password: 'testing'
      }
      chai.request(server)
        .post('/api/users/signin')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
    // Test for update user
    it('it should UPDATE a user', (done) => {
      User.findOne({
        'email': 'testing@testing.com'
      })
      .then((user) => {
        let id = user._id
        let newUser = {
          name: 'updated test'
        }
        chai.request(server)
          .put('/api/users/edit')
          .set('id', id)
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.name.should.equal('updated test')
            done()
          })
      })
    })
  })
})

describe('News', () => {
  // Test for posting a user
  describe('GET /api/news/', () => {
    it('it should GET all news for a user', (done) => {
      User.findOne({
        'email': 'testing@testing.com'
      })
      .then((user) => {
        let id = user._id
        chai.request(server)
          .get('/api/news/')
          .set('id', id)
          .send()
          .end((err, res) => {
            res.should.have.status(200)
            res.should.have.status(200)
            // Add other stuff here
            done()
          })
      })
    })
  })
  describe('GET /api/news/stockId', () => {
    it('it should GET news for a specific stock', (done) => {
      User.findOne({
        'email': 'testing@testing.com'
      })
      .then((user) => {
        let id = user._id
        chai.request(server)
          .get('/api/news/:MSFT')
          .set('id', id)
          .send()
          .end((err, res) => {
            res.should.have.status(200)
            // Add other stuff here
            done()
          })
      })
    })
  })
})

describe('Stocks', () => {

})
