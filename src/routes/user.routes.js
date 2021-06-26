const router = require('express').Router();

const {postUser, getUsers, getUserById, updateUserById, deleteUserById} = require('../controllers/user.controller');

const ensureToken = require('../middlewares/authorization');
const { isGerencial } = require('../middlewares/validator');

// crear
router.post('/create', postUser)

// Listar todos los usuarios
router.get('/', ensureToken, getUsers)

// Buscar usuario por Id
router.get('/:userId', ensureToken, getUserById)

// editar usuario
router.put('/:userId', [ensureToken, isGerencial], updateUserById)

// Elminar usuario
router.delete('/:userId', [ensureToken, isGerencial], deleteUserById)


module.exports = router;