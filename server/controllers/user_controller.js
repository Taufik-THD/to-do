const User = require('../models/user')
const todo = require('../models/todo')

module.exports = {

  register(req, res){

    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.username}]}, function (err, user) {

      var reg = new RegExp(/[0-9!"£$%^&*()_+-=]/)

      const validations = [
        [err, { code: 404, message: err }],
        [req.body.password.length < 8, { code: 406, message: 'Password must be a minimum 8 characters' }],
        [!reg.test(req.body.password), { code: 406, message: 'Password must have at least one number' }],
        [user, { code: 409, message: 'This account is already registered!' }],
      ];

      let isError = false;
      let error = {};

      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];
        const condition = validation[0];
        if (condition) {
          error = validation[1];
          isError = true;
          break;
        }
      };
      
      if (!isError) {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })

        newUser.save((err) => {
          if (err){

            const message = err

            res.status(400).json(message)

          } else {

            res.status(201).json('data has been saved!')

          }

        })
      } else {
        res.status(error.code).json(error.message);
      }

    })

  },

  login(req, res){

    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.username}
    ]}, function (err, user) {

      if (err) {
        throw err
      }

      user.comparePassword(req.body.password, function (err, isMatch) {

        if (err) {
          throw err
        }

        if (isMatch) {

          user.token = jwt.sign({id: user._id}, 'secret_token')
          res.status(200).json(user.token)

        } else {

          res.status(404).json("wrong password !")

        }

      })

    })

  }

}
