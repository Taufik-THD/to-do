const todo = require('../models/todo')
const jwt = require('jsonwebtoken');
// const token = jwt.decode(req.headers.token)

module.exports = {

  create_new_todo(req, res){

    const newTodo = new todo({
      activity: req.body.activity,
      status: false,
      tag: [],
      user: token.id
    })

    newTodo.save((err) => {
      if (err) throw err

      res.status(201).json("new todo has been saved!")
    })

  },

  readMyTodos(req, res){

    todo.
      find({ user: token.id }).
      populate('user').
      exec(function (err, todo) {
        if (err) console.log(err)
        res.status(200).json(todo)
    });

  }

};
