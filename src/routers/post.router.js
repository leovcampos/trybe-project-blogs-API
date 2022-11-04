const express = require('express');
const validateToken = require('../middlewares/validate.token');
const validatePost = require('../middlewares/validate.post');
const postControllers = require('../controllers/post.controller');

const router = express.Router();

router.post('/', validateToken, validatePost, postControllers.newPost);
router.get('/', validateToken, postControllers.findAll);
router.get('/:id', validateToken, postControllers.getById);
router.delete('/:id', validateToken, postControllers.deletePost);
router.put('/:id', validateToken, validatePost, postControllers.updatePost);
router.get('/search/', validateToken, postControllers.getByQuery);

module.exports = router;
