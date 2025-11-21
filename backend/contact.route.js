const express = require('express');
const router = express.Router();
const contactController = require('./contactController');
const { protect, admin } = require('./authController');

router.get('/', protect, contactController.getContacts);
router.post('/', protect, contactController.createContact);
router.delete('/:id', protect, admin, contactController.deleteContact);

module.exports = router;
