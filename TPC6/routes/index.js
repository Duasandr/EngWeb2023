/**
 * @file index.js
 * @brief File that contains the routes for handling requests
 * @version 1.0
 * @date 2021-05-10
 * @author Sandro Duarte
 */

// Import express module
var express = require('express');
// Import express router
var router = express.Router();
// Import Person controller
const Person = require('../controllers/Person.js');

// GET methods ---------------------------------------------------------------

/**
 * @brief Get Person route
 * @details Returns a person with the given id
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {Promise} Promise that returns a person with the given id
 * @returns {JSON} JSON object with the person
 * @returns {JSON} JSON object with the error message
 * @example
 * // Returns a person with the given id
 * http://localhost:3000/people/p1
 */
router.get('people/:id', (req, res) => {
    Person.get(req.params.id)
        .then(data => { res.jsonp(data); })
        .catch(err => { res.jsonp(err); });
});

/**
 * @brief People List route
 * @details Returns a list of all people
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {Promise} Promise that returns a list of all people sorted by name in descending order
 * @returns {JSON} JSON object with the list of people
 * @returns {JSON} JSON object with the error message
 * @example
 * // Returns a list of all people sorted by name in descending order
 * http://localhost:3000/people
 *
 */
router.get('/people', (req, res) => {
    Person.list()
        .then(data => { res.jsonp(data); })
        .catch(err => { res.jsonp(err); });
});

// POST methods ---------------------------------------------------------------

/**
 * @brief Insert Person route
 * @details Inserts a new person in the database
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {Promise} Promise that returns the inserted person
 * @returns {JSON} JSON object with the inserted person
 * @returns {JSON} JSON object with the error message
 */
router.post('/people/insert', (req, res) => {
    Person.insert(req.body)
        .then(data => { console.log(data); res.jsonp(data); })
        .catch(err => { res.jsonp(err); });
});

// PUT methods ---------------------------------------------------------------

/**
 * @brief Update Person route
 * @details Updates a person in the database
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {Promise} Promise that returns the updated person
 * @returns {JSON} JSON object with the updated person
 * @returns {JSON} JSON object with the error message
 */
router.put('/people/update/:id', (req, res) => {
    Person.update(req.params.id, req.body)
        .then(data => { res.jsonp(data); })
        .catch(err => { res.jsonp(err); });
});

// DELETE methods ---------------------------------------------------------------

/**
 * @brief Delete Person route
 * @details Deletes a person from the database
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 * @returns {Promise} Promise that returns the deleted person
 * @returns {JSON} JSON object with the deleted person
 * @returns {JSON} JSON object with the error message
 * @example
 * // Deletes a person with the given id
 * http://localhost:3000/people/delete/p1
 */
router.post('/people/delete/:id', (req, res) => {
    Person.delete(req.params.id)
        .then(data => { res.jsonp(data); })
        .catch(err => { res.jsonp(err); });
});

module.exports = router;
