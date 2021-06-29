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
        rol: Joi.string()
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
        //console.dir(error)
        res.status(400).json({error});
    }
    
}

// list users 
const getUsers = async (req, res) => {
    const user = await User.find().populate('rol')
    res.json(user)
}

// search user by id
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).populate('rol')
    if(user){
        return res.json({
            message: "Busqueda exitosa!",
            user
        })
    } else {
        return res.json({
            message: "Buesqueda fallida"
        })
        
    }
}

// edit user
const updateUserById = async (req, res) => {
    
    const userUpdate = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    }).populate('rol')
    res.status(200).json({message: "Usuario modificado", userUpdate})

}

// Delete User
const deleteUserById = async (req, res) => {
    const userDelete = await User.findByIdAndDelete(req.params.userId).populate('rol')
    res.status(200).json({message: "Usuario eliminado con exito!", userDelete})
}

module.exports = {
    postUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}