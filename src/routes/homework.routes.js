const router = require('express').Router();
const {postHomework, getAllHomework, getHomework, getStatusHomework, updateHomeworkById, deleteById} = require('../controllers/homework.controller');


// create homework
router.post('/create', postHomework);

// all list homework
router.get('/', getAllHomework);

// list homework for user id
router.get('/:HomeworkId', getHomework);

// search homework for userid and status homework
router.get('/:HomeworkId/:StatusId', getStatusHomework);

// edit homework
router.put('/:HomeworkId', updateHomeworkById);

// delete homework
router.delete('/:HomeworkId', deleteById);

module.exports = router;