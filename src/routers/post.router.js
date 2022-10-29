const express = require('express');
const validateToken = require('../middlewares/validate.token');
const validatePost = require('../middlewares/validate.post');
const postControllers = require('../controllers/post.controller');

const router = express.Router();

router.post('/', validateToken, validatePost, postControllers);

module.exports = router;
