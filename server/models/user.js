const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  loginVia: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  }
})

const User = mongoose.model('User', userSchema);

userSchema.path('email').validate(function(email){
  if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
    return false;
  } else if(email.indexOf('@') === 0 || email.indexOf('.') === email.length - 1){
    return false;
  } else if(email.indexOf('.') - email.indexOf('@') < 2){
    return false;
  }

  return User.findOne({
      email: email
    })
    .then(user => {
      if(user && user.id !== this.id) return false;
      return true;
    })
    .catch(err => {
      return false;
    })
}, 'Wrong Email Format/ Email Has Been Taken');

module.exports = User;