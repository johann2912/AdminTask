const router = require('express').Router();
const homework = require('../controllers/homework.controller')

// create homework
router.post('/create', homework)


module.exports = router;