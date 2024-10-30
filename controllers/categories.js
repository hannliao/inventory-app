const db = require('../db/queries');

async function getCategories(req, res) {
  const categories = await db.getCategories();
  res.render('index', {
    title: 'Categories',
    main: 'partials/categories',
    categories,
  });
}

async function filterItemsGet(req, res) {
  const category = await db.getCategory(req.params.category);
  const itemsInCategory = await db.filterItems(category.name);
  res.render('index', {
    title: `${category.name}`,
    main: 'partials/itemsGridView',
    category: category,
    items: itemsInCategory,
  });
}

async function addCategoryGet(req, res) {
  res.render('index', { title: 'Add Category', main: 'partials/addCategory' });
}

async function addCategoryPost(req, res) {
  const category = {
    name: req.body.name,
    color: req.body.color,
  };
  await db.addCategory(category);
  res.redirect('/categories');
}

async function editCategoryGet(req, res) {
  const category = await db.getCategory(req.params.category);
  res.render('index', {
    title: 'Edit Category',
    main: 'partials/editCategory',
    category,
  });
}

async function editCategoryPost(req, res) {
  const currentCategory = await db.getCategory(req.params.category);

  const category = {
    id: currentCategory.id,
    name: req.body.name,
    color: req.body.color,
  };
  await db.updateCategory(category);
  res.redirect('/categories');
}

async function deleteCategoryPost(req, res) {
  const category = await db.getCategory(req.params.category);

  await db.deleteCategory(category);
  await db.deleteItemCategories(category);
  res.redirect('/categories');
}

module.exports = {
  getCategories,
  filterItemsGet,
  addCategoryGet,
  addCategoryPost,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
};
