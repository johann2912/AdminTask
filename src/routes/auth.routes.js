const router = require('express').Router();
const { signUp, logout } = require('../controllers/auth.controller')

const ensureToken = require('../middlewares/authorization');

router.post('/signUp',  signUp)

router.delete('/logout/:id',  ensureToken,  logout)

module.exports = router;