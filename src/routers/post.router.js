const express = require('express');
const validateToken = require('../middlewares/validate.token');
const validatePost = require('../middlewares/validate.post');
const postControllers = require('../controllers/post.controller');

const router = express.Router();

router.post('/', validateToken, validatePost, postControllers.newPost);
router.get('/', validateToken, postControllers.findAll);
router.get('/:id', validateToken, postControllers.getById);
// router.put('/:id', validateToken, validatePost, postControllers.updatePost);

module.exports = router;
