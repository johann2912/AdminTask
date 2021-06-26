const router = require('express').Router();
const postHomework = require('../controllers/statushomework.controller');

const ensureToken = require('../middlewares/authorization');
const { isGerencial } = require('../middlewares/validator');

// create status homework
router.post('/create', [ensureToken, isGerencial], postHomework)

module.exports = router