const router = require('express').Router();
const { postRole, getRoles } = require('../controllers/role.controller');

const ensureToken = require('../middlewares/authorization');
const { isGerencial } = require('../middlewares/validator');

// create roles
router.post('/create', [ensureToken, isGerencial], postRole)

router.get('/listRoles', [ensureToken, isGerencial], getRoles)

module.exports = router