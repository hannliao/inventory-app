const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categories');

router.get('/', controller.getCategories);
router.get('/new', controller.addCategoryGet);
router.post('/new', controller.addCategoryPost);
router.get('/edit/:category', controller.editCategoryGet);
router.post('/edit/:category', controller.editCategoryPost);
router.post('/delete/:category', controller.deleteCategoryPost);
router.get('/:category', controller.filterItemsGet);

module.exports = router;
