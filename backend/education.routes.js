const express = require('express');
const router = express.Router();
const educationController = require('./educationController');
const { protect, admin } = require('./authController');

router.get('/', protect, educationController.getEducation);
router.post('/', protect, educationController.createEducation);
router.delete('/:id', protect, admin, educationController.deleteEducation);

module.exports = router;
