const User = require('../models/user.js');
const JWTDecoder = require('../helpers/JWTDecoder.js');
const hashPassword = require('../helpers/hashPassword.js');
const sendToClient = require('../helpers/sendToClient.js');
require('dotenv').config();

class UserController {
  static login(req, res){
    let token = '';
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if(user && req.body.loginVia === 'google'){
          token = JWTDecoder(user, 'sign');
          res.status(201).json(sendToClient(token, user));
        } else if(user && req.body.loginVia === 'website'){
          if(user.password === hashPassword(req.body.password)){
            token = JWTDecoder(user, 'sign');
            res.status(200).json(sendToClient(token, user));
          }
          else {
            res.status(400).json({err: 'Wrong Password'});
          }
        } else if(!user && req.body.loginVia === 'google'){
          return User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(process.env.GOOGLE_DUMMY_PASSWORD),
            loginVia: 'google',
            created_at: new Date
          })
          .then(user => {
            token = JWTDecoder(user, 'sign');
            res.status(201).json(sendToClient(token, user));
          })
          .catch(err => {
            res.status(500).json({err: err})
          })
        } else {
          res.status(500).json({err: 'Wrong Email'});
        }
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static register(req, res){
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        loginVia: 'website',
        created_at: new Date
      })
      .then(user => {
        let token = JWTDecoder(user, 'sign');
        res.status(201).json(sendToClient(token, user));
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }

  static authenticate(req, res){
    const user = JWTDecoder(req.headers.token, 'verify');
    User
      .findOne({
        email: user.email,
        password: user.password,
        loginVia: user.loginVia
      })
      .then(user => {
        if(user){
          res.status(200).json(user);
        } else {
          res.status(400).json({err: 'invalid token'});
        }
      })
      .catch(err => {
        res.status(500).json({err: err.message});
      })
  }
}

module.exports = UserController