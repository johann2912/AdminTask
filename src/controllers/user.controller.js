const User = require('../models/user');
const Joi = require('@hapi/joi');

// Register user 
const postUser = async (req, res) => {
    
    // Validation user
    const schemaRegister = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        last_name: Joi.string().min(3).max(255).required(),
        document: Joi.string().min(3).max(255).required(),
        document_number: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(1024).required(),
        rol: Joi.string().required()
    })

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'El usuario ya se  encuentra registrado'}
        )
    }

    const {name, last_name, document, document_number, email, password, rol} = req.body
    const user = new User({ name, last_name, document, document_number, email, password, rol });
    console.log(user)

    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        });
    } catch (error) {
        console.dir(error)
        res.status(400).json({error});
    }
    
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
    postUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}