const { Router } = require('express');
const router = Router();
const controller = require('../controllers/items');

router.get('/', controller.getItems);
router.get('/new', controller.addItemGet);
router.post('/new', controller.addItemPost);
router.get('/edit/:id', controller.editItemGet);
router.post('/edit/:id', controller.editItemPost);
router.get('/:id', controller.getItemDetails);
router.get('/:category', controller.filterItemsGet);

module.exports = router;
