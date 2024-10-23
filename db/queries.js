const pool = require('./pool');

async function getItems() {
  const { rows } = await pool.query('SELECT * FROM origami;');
  return rows;
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
    SET name = $1, src = $2, price = $3, qty = $4
    WHERE id = $5`,
    [item.name, item.src, item.price, item.qty, item.id]
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
  getCategories,
  filterItems,
  addItem,
  addCategory,
  updateItem,
  updateCategory,
};
