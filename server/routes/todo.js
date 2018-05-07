const express = require('express');
const router = express.Router();
const { create_new_todo, readMyTodos } = require('../controllers/todo_controller');
const { authentication } = require('../middlewares/authentication');

router.get('/', authentication, readMyTodos)

router.post('/', authentication, create_new_todo)

module.exports = router;
