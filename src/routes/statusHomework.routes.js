const router = require('express').Router();
const postHomework = require('../controllers/statushomework.controller');

// create status homework
router.post('/create', postHomework)

module.exports = router