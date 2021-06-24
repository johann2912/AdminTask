const router = require('express').Router();

const {postUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/user.controller');

// crear
router.post('/create', postUser)

// Listar todos los usuarios
router.get('/', getUsers)

// Buscar usuario por Id
router.get('/:userId', getUserById)

// editar usuario
router.put('/:userId', updateUserById)

// Elminar usuario
router.delete('/:userId', deleteUserById)


module.exports = router;