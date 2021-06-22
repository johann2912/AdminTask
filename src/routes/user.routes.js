const router = require('express').Router();

const {getUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/user.controller');
//import * as userController from '../controllers/user.controller'

// crear
router.post('/', getUser)

// Listar todos los usuarios
router.get('/', getUsers)

// Buscar usuario por Id
router.get('/:userId', getUserById)

// editar usuario
router.put('/:userId', updateUserById)

// Elminar usuario
router.delete('/:userId', deleteUserById)


module.exports = router;