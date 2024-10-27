const db = require('../db/queries');

async function getCategories(req, res) {
  const categories = await db.getCategories();
  res.render('index', {
    title: 'Categories',
    main: 'partials/categories',
    categories,
  });
}

async function addCategoryGet(req, res) {
  res.render('index', { title: 'Add Category', main: 'partials/addCategory' });
}

async function addCategoryPost(req, res) {
  const category = req.body.category;
  await db.addCategory(category);
  res.redirect('/categories');
}

module.exports = {
  getCategories,
  addCategoryGet,
  addCategoryPost,
};
