const db = require('../db/queries');

async function getItems(req, res) {
  const items = await db.getItems();
  res.render('index', {
    title: 'Inventory',
    main: 'partials/itemsGridView',
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
  res.render('index', { title: 'Edit Item', main: 'partials/editItem', item });
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
  addItemGet,
  addItemPost,
  editItemGet,
  editItemPost,
};
