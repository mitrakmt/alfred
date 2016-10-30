process.env.NODE_ENV = 'test'

let chai = require('chai')
let mongoose = require('mongoose')
let chaiHttp = require('chai-http')
let express = require('express')
let server = require('../server')
let should = chai.should()
let stockController = require('../controllers/stockController')
let assert = chai.assert

chai.use(chaiHttp)

describe('Stocks', () => {
  beforeEach((done) => {
      User.remove({}, (err) => {
         done()
      })
  })
  describe('POST /api/users/signup', () => {
    it('it should POST a new user', (done) => {
      let user = {
        name: 'Test Master Test',
        email: 'testing@test.com',
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
  })
})
