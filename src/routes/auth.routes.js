const router = require('express').Router();
const { signUp, signIn } = require('../controllers/auth.controller')


router.post('/signUp', signUp)
router.delete('/signIn/:id', signIn)

module.exports = router;