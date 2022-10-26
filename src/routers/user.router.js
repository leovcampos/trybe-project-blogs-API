const express = require('express');
const validateUser = require('../middlewares/validate.user');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', validateUser, userController);

module.exports = router;