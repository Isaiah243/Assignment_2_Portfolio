const express = require('express');
const router = express.Router();
const educationController = require('./education.controller');
const { protect, admin } = require('./auth.controller');

router.get('/', protect, educationController.getEducation);
router.post('/', protect, admin, educationController.createEducation);
router.delete('/:id', protect, admin, educationController.deleteEducation);

module.exports = router;
