/**
 * @file user.js
 * @description This file contains the controller for the user model.
 */

const axios = require('axios')

// GET --------------

/**
 * Returns the list of tasks.
 */
module.exports.list = () => {
  return axios.get('http://localhost:3000/users')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

// POST --------------

/**
 * Adds a user to the dataset
 * @param {*} task 
 * @returns 
 */
module.exports.add = (user) => {
  return axios.post('http://localhost:3000/users', user)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}