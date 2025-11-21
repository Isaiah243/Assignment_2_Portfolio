const express = require('express');
const router = express.Router();
const projectController = require('./projectController');
const { protect, admin } = require('./authController');

router.get('/', protect, projectController.getProjects);
router.post('/', protect, projectController.createProject);
router.delete('/:id', protect, admin, projectController.deleteProject);

module.exports = router;
