const pool = require('./pool');

async function getItems() {
  const { rows } = await pool.query('SELECT * FROM origami ORDER BY id;');
  return rows;
}

async function getItemDetails(id) {
  const { rows } = await pool.query(`SELECT * FROM origami WHERE id = $1`, [
    id,
  ]);
  return rows[0];
}

async function getCategories() {
  const { rows } = await pool.query('SELECT category FROM categories;');
  return rows.map((row) => row.category);
}

async function filterItems(category) {
  const { rows } = await pool.query(
    `
    SELECT * FROM origami
    INNER JOIN origami_categories ON origami.id = origami_categories.origami_id
    INNER JOIN categories ON origami_categories.category_id = categories.id
    WHERE categories.category = $1
    `,
    [category]
  );
  return rows;
}

async function addItem(item) {
  const { name, src, price, qty } = item;
  await pool.query(
    'INSERT INTO origami (name, src, price, qty) VALUES ($1, $2, $3, $4)',
    [name, src, price, qty]
  );
}

async function addCategory(category) {
  await pool.query('INSERT INTO categories (category) VALUES ($1)', [category]);
}

async function updateItem(item) {
  await pool.query(
    `
    UPDATE origami
    SET name = $2, src = $3, price = $4, qty = $5
    WHERE id = $1`,
    [item.id, item.name, item.src, item.price, item.qty]
  );
}

async function updateCategory(category) {
  await pool.query(
    `
    UPDATE categories
    SET category = $1
    WHERE id = $2`,
    [category.category, category.id]
  );
}

module.exports = {
  getItems,
  getItemDetails,
  getCategories,
  filterItems,
  addItem,
  addCategory,
  updateItem,
  updateCategory,
};
