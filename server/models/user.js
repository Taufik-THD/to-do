const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const salt_rounds = 10
const validator = require('validator');

const userSchema = new Schema({
  username: { type: String, required: true, unique:true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    // validate:{
    //   validator: validator.isEmail,
    //   message: `{VALUE} is not a valid email !`,
    //   isAsync: false
    // }
  },
  password: {type: String, required: true}
},{
  timestamps: true
})

userSchema.pre('save', function(next){
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(salt_rounds, function(err, salt){
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err)

      user.password = hash
      next()
    })

  })

})

userSchema.methods.comparePassword = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)


module.exports = User;
