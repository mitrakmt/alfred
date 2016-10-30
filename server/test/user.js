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
  })

})
