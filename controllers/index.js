const db = require('../db/queries');

module.exports = {
  async get(req, res) {
    const items = await db.getItems();
    res.render('index', {
      title: 'Home',
      main: 'partials/itemsListView',
      items,
    });
  },
};
