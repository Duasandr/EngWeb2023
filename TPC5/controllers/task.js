/**
 * @file task.js
 * @description This file contains the controller for the task model.
 */

const axios = require('axios')

// GET --------------

/**
 * Returns the list of tasks.
 */
module.exports.list = () => {
  return axios.get('http://localhost:3000/tasks')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

// POST --------------

/**
 * Adds a task to the dataset
 * @param {*} task 
 * @returns 
 */
module.exports.add = (task) => {
  return axios.post('http://localhost:3000/tasks', task)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

/**
 * Updates a task in the dataset
 * @param {*} task 
 * @returns 
 */
module.exports.update = (task) => {
  return axios.put('http://localhost:3000/tasks/' + task.id, task)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}
