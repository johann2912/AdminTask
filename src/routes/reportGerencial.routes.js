const router = require('express').Router();
const reportGerencial = require('../controllers/reportGerencial.controller');

router.post('/statisticalHomeworks', reportGerencial);

module.exports = router;