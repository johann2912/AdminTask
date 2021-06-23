const router = require('express').Router();
const  postRole = require('../controllers/role.controller');

// create roles
router.post('/create', postRole)

module.exports = router