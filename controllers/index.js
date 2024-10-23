const db = require('../db/queries');

module.exports = {
  async get(req, res) {
    const products = await db.getAllProducts();
    res.render('index', { title: 'Products', products });
  },
};
