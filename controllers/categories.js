const db = require('../db/queries');

async function getCategories(req, res) {
  const categories = await db.getCategories();
  res.render('categories', { title: 'Categories', categories });
}

async function addCategoryGet(req, res) {
  res.render('addCategory', { title: 'Add Category' });
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
