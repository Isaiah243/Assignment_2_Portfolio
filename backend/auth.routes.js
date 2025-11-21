const express = require('express');
const router = express.Router();
const { signup, signin } = require('./user.controller');


router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
