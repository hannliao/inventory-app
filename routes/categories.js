const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categories');

router.get('/', controller.getCategories);
router.get('/new', controller.addCategoryGet);
router.post('/new', controller.addCategoryPost);

module.exports = router;
