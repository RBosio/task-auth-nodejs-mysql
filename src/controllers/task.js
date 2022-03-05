const pool = require('../database')

module.exports = {
  getAll: async (req, res) => {
    const tasks = await pool.query('SELECT * FROM task WHERE id_user = ?', [req.user.id])
    res.render('tasks/list', {tasks})
  },
  addTaskForm: async (req, res) => {
    res.render('tasks/add')
  },
  addTask: async (req, res) => {
    const { title, description } = req.body
    const result = await pool.query('INSERT INTO task (title, description, id_user) VALUES (?, ?, ?)', [title, description, req.user.id])
    req.flash('success', 'Task added successfully')
    res.redirect('/task')
  },
  editTaskForm: async (req, res) => {
    const { id } = req.params
    const row = await pool.query('SELECT * FROM task WHERE id = ?', [id])
    res.render('tasks/edit', {task: row[0]})
  },
  editTask: async (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    await pool.query('UPDATE task SET title = ?, description = ? WHERE id = ?', [title, description, id])
    req.flash('success', 'Task edited successfully')
    res.redirect('/task')
  },
  deleteTask: async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM task WHERE id = ?', [id])
    req.flash('success', 'Task removed successfully')
    res.redirect('/task')
  }
}