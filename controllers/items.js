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
  const categories = await db.getCategories();
  res.render('index', {
    title: 'Add Item',
    main: 'partials/addItem',
    categories,
  });
}

async function addItemPost(req, res) {
  const item = {
    name: req.body.name,
    src: req.body.src || '/img/default.jpg',
    price: req.body.price,
    qty: req.body.qty,
  };
  item.id = await db.addItem(item);

  const categories = req.body.categories
    ? Array.isArray(req.body.categories)
      ? req.body.categories
      : [req.body.categories]
    : [];

  for (const categoryName of categories) {
    const category = await db.getCategory(categoryName);
    await db.addItemCategory(item, category);
  }
  res.redirect('/items');
}

async function editItemGet(req, res) {
  const item = await db.getItemDetails(req.params.id);
  const itemCategories = await db.getItemCategories(item);
  const categories = await db.getCategories();
  res.render('index', {
    title: 'Edit Item',
    main: 'partials/editItem',
    item,
    itemCategories,
    categories,
  });
}

async function editItemPost(req, res) {
  const currentItem = await db.getItemDetails(req.params.id);
  const currentCategories = await db.getItemCategories(currentItem);

  const item = {
    id: req.params.id,
    name: req.body.name,
    src: req.file ? req.file.path : currentItem.src,
    price: req.body.price,
    qty: req.body.qty,
  };
  await db.updateItem(item);

  const categories = req.body.categories
    ? Array.isArray(req.body.categories)
      ? req.body.categories
      : [req.body.categories]
    : [];

  const allCategories = await db.getCategories();

  for (const category of allCategories) {
    if (
      currentCategories.includes(category.name) &&
      !categories.includes(category.name)
    ) {
      // if category was previously checked and is now unchecked, delete relation
      await db.deleteItemCategory(item, category);
    }
    if (
      !currentCategories.includes(category.name) &&
      categories.includes(category.name)
    ) {
      // if category was not previously checked and is now checked, add relation
      await db.addItemCategory(item, category);
    }
  }

  res.redirect('/items');
}

async function deleteItemPost(req, res) {
  const itemId = req.params.id;

  await db.deleteItem(itemId);
  await db.deleteItemsFromCategories(itemId);
  res.redirect('/items');
}

module.exports = {
  getItems,
  getItemDetails,
  addItemGet,
  addItemPost,
  editItemGet,
  editItemPost,
  deleteItemPost,
};
