/**
 * @file Person.js
 * @brief File that contains the Person controller
 * @version 1.0
 * @date 2021-05-10
 * @author: Sandro Duarte
 */

// Import Person model
const Person = require('../models/Person.js');

// GET methods ---------------------------------------------------------------

/**
 * @brief Person List
 * @details Returns a list of all persons
 * @returns {Promise} Promise that returns a list of all persons sorted by name in descending order
 */
module.exports.list = () => {
    return Person.find().sort({ name: -1 })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

/**
 * @brief Get Person
 * @details Returns a person with the given id
 * @param {string} id _id of the person to be returned
 * @returns {Promise} Promise that returns a person with the given id. If the person does not exist, returns null 
 */
module.exports.get = id => {
    return Person.findById(id)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

// POST methods ---------------------------------------------------------------

/**
 * @brief Insert Person
 * @details Inserts a new person in the database
 * @param {*} person Person to be inserted. Can also be a list of people
 * @returns {Promise} Promise that returns the inserted person
 */
module.exports.insert = person => {
    return Person.create(person)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

// PUT methods ---------------------------------------------------------------

/**
 * @bief Update Person
 * @details Updates a person in the database
 * @param {*} person Person to be updated. Must contain the _id of the person to be updated
 * @returns {Promise} Promise that returns the updated person
 */
module.exports.update = person => {
    return Person.updateOne({ _id: person._id}, person)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

// DELETE methods ---------------------------------------------------------------

/**
 * @brief Delete Person
 * @details Deletes a person from the database
 * @param {*} id _id of the person to be deleted
 * @returns {Promise} Promise that returns the deleted person
 */
module.exports.delete = id => {
    return Person.deleteOne({ _id: id})
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}