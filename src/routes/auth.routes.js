const router = require('express').Router();
const { signUp, logout } = require('../controllers/auth.controller')


router.post('/signUp', signUp)
router.delete('/signIn/:id', logout)

module.exports = router;