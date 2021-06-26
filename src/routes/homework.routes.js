const router = require('express').Router();
const {postHomework, getAllHomework, getHomework, getStatusHomework, updateHomeworkById, deleteById, checkHomework} = require('../controllers/homework.controller');

const ensureToken = require('../middlewares/authorization');
const { isGerencial } = require('../middlewares/validator');

// create homework
router.post('/create', [ensureToken, isGerencial], postHomework);

// all list homework
router.get('/', ensureToken, getAllHomework);

// list homework for user id
router.get('/:HomeworkId', ensureToken, getHomework);

// search homework for userid and status homework
router.get('/:HomeworkId/:StatusId', getStatusHomework);

// edit homework
router.put('/:HomeworkId', [ensureToken, isGerencial], updateHomeworkById);

// delete homework
router.delete('/:HomeworkId', [ensureToken, isGerencial], deleteById);

// check status homework
router.put('/state/:HomeworkId', ensureToken, checkHomework);


module.exports = router;