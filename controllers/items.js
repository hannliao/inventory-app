const db = require('../db/queries');

async function getItems(req, res) {
  const items = await db.getItems();
  res.render('index', {
    title: 'Items',
    main: 'partials/itemsListView',
    items,
  });
}

async function getItemDetails(req, res) {
  const item = await db.getItemDetails(req.params.id);
  res.render('index', {
    title: 'Item Details',
    main: 'partials/itemDetails',
    item,
  });
}

async function filterItemsGet(req, res) {
  const category = req.params.category;
  const itemsInCategory = await db.filterItems(category);
  res.render('index', {
    title: `${category}`,
    main: 'partials/itemsListView',
    items: itemsInCategory,
  });
}

async function addItemGet(req, res) {
  res.render('index', { title: 'Add Item', main: 'partials/addItem' });
}

async function addItemPost(req, res) {
  const item = {
    name: req.body.name,
    src: req.body.src,
    price: req.body.price,
    qty: req.body.qty,
  };
  await db.addItem(item);
  res.redirect('/items');
}

async function editItemGet(req, res) {
  const item = await db.getItemDetails(req.params.id);
  res.render('index', { title: 'Edit Items', main: 'partials/editItem', item });
}

async function editItemPost(req, res) {
  const currentItem = await db.getItemDetails(req.params.id);

  const item = {
    id: req.params.id,
    name: req.body.name,
    src: req.file ? req.file.path : currentItem.src,
    price: req.body.price,
    qty: req.body.qty,
  };
  await db.updateItem(item);
  res.redirect('/items');
}

module.exports = {
  getItems,
  getItemDetails,
  filterItemsGet,
  addItemGet,
  addItemPost,
  editItemGet,
  editItemPost,
};
