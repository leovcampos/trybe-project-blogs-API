const express = require('express');
const validateLogin = require('../middlewares/validate.login');
const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post('/', validateLogin, loginController.login);

module.exports = router;
