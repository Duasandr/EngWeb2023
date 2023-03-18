var express = require('express');
var router = express.Router();
var Task = require('../controllers/task.js')
var User = require('../controllers/user.js')

// GET --------------

/**
 * GET index page.
 */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      console.log(tasks)
      res.render('index', { taskList: tasks, d: date });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error obtaining tasks"})
    })
});

// POST --------------

/**
 * POST submit a new user.
 */
router.post('/users/submit', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  User.add(req.body)
    .then(task => {
      console.log(task)
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error obtaining tasks"})
    })
});

/**
 * POST submit a new task.
 */
router.post('/tasks/submit', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Task.add(req.body)
    .then(task => {
      console.log(task)
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error obtaining tasks"})
    })
});

/**
 * POST mark task as resolved
 */
router.post('/tasks/submit/resolved', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Task.update(req.body)
    .then(task => {
      console.log(task)
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error obtaining tasks"})
    })
});

/**
 * POST mark task as unresolved
 */
router.post('/tasks/submit/unresolved', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Task.update(req.body)
    .then(task => {
      console.log(task)
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error obtaining tasks"})
    })
});
