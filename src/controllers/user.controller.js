const user = require('../models/user');

// create user
const getUser = (req, res) => {
    res.json('creando usuarios')
}

// list users
const getUsers = (req, res) => {
    res.json('all users of the list')
}

// search product by id
const getUserById = (req, res) => {

}

// edit user
const updateUserById = (req, res) => {

}

// Delete User
const deleteUserById = (req, res) => {

}

module.exports = {
    getUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}