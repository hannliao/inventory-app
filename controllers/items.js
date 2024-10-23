const db = require('../db/queries');

async function getItems(req, res) {
  const items = await db.getItems();
  res.render('items', { title: 'Items', items });
}

async function filterItemsGet(req, res) {
  const category = req.params.category;
  const itemsInCategory = await db.filterItems(category);
  res.render('items', { title: `${category}`, items: itemsInCategory });
}

async function addItemGet(req, res) {
  res.render('addItem', { title: 'Add Item' });
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

module.exports = {
  getItems,
  filterItemsGet,
  addItemGet,
  addItemPost,
};
