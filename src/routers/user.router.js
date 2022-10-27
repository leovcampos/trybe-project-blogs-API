const express = require('express');
const validateUser = require('../middlewares/validate.user');
const validateToken = require('../middlewares/validate.token');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', validateUser, userController.newUser);
router.get('/', validateToken, userController.getAll);
router.get('/:id', validateToken, userController.getById);

module.exports = router;