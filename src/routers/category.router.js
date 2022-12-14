const express = require('express');
const validateToken = require('../middlewares/validate.token');
const validateCategory = require('../middlewares/validate.category');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', validateToken, validateCategory, categoryController.newCategory);
router.get('/', validateToken, categoryController.getAllCategories);

module.exports = router;