const User = require('../models/user.js');
const Article = require('../models/article.js');
const JWTDecoder = require('../helpers/JWTDecoder.js');

module.exports = {

  authorization: (req, res, next) => {
    const user = JWTDecoder(req.headers.token, 'verify');
    Article
      .findOne({
        _id: req.params.id
      })
      .then(article => {
        if(article.userId != user._id){
          res.status(400).json({err: 'Not Authorized to Use This Feature'});
        } else {
          next();
        }
      })
      .catch(err => {
        res.status(400).json({err: err.message})
      })
  },

  authentication: (req, res, next) => {
    if(req.headers.token.indexOf('undefined') !== -1) res.status(400).json({err: 'Please Login First'});
    else {
      signedUser = JWTDecoder(req.headers.token, 'verify').data;
      User
        .findOne({
          email: signedUser.email,
          password: signedUser.password,
        })
        .then(user => {
          if(!user){
            res.status(400).json({err: 'Invalid Email/Password'});
          } else if(signedUser.loginVia !== user.loginVia){
            res.status(400).json({err: `Please Login Via ${user.loginVia}`})
          } else {
            next();
          }
        })
        .catch(err => {
          res.status(400).json({err: err.message})
        })
    }
  },

  
}