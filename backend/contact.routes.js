const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');
const { protect, admin } = require('./auth.controller');

router.get('/', protect, contactController.getContacts);
router.post('/', protect, contactController.createContact);
router.delete('/:id', protect, admin, contactController.deleteContact);

module.exports = router;
