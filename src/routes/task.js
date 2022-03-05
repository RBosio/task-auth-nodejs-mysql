const router = require('express').Router()
const { getAll, editTaskForm, addTaskForm, addTask, editTask, deleteTask } = require('../controllers/task')
const { isAuthenticated } = require('../lib/auth')

router.route('/')
  .get(isAuthenticated, getAll)

router.route('/add')
  .get(isAuthenticated, addTaskForm)
  .post(isAuthenticated, addTask)

router.route('/edit/:id')
  .get(isAuthenticated, editTaskForm)
  .post(isAuthenticated, editTask)

router.route('/delete/:id')
  .get(isAuthenticated, deleteTask)

module.exports = router