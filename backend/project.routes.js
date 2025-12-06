const express = require('express');
const router = express.Router();
const projectController = require('./project.controller');
const { protect, admin } = require('./auth.controller');

router.get('/', protect, projectController.getProjects);
router.post('/', protect, admin, projectController.createProject);
router.delete('/:id', protect, admin, projectController.deleteProject);

module.exports = router;
