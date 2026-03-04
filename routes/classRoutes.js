const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getAllClasses);
router.get('/new', classController.createForm);
router.post('/', classController.createClass);
router.get('/:id', classController.getClass);
router.get('/:id/edit', classController.editForm);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;