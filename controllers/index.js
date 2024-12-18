const db = require('../db/queries');

module.exports = {
  async get(req, res) {
    const items = await db.getItems();
    res.render('index', {
      title: 'Inventory',
      main: 'partials/itemsGridView',
      items,
    });
  },
};
