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
  const { rows } = await pool.query('SELECT * FROM categories ORDER BY id;');
  return rows;
}

async function getCategory(categoryName) {
  const { rows } = await pool.query(
    `SELECT * FROM categories WHERE name = $1`,
    [categoryName]
  );
  return rows[0];
}

async function filterItems(categoryName) {
  const { rows } = await pool.query(
    `
    SELECT origami.* FROM origami
    INNER JOIN origami_categories ON origami.id = origami_categories.origami_id
    INNER JOIN categories ON origami_categories.category_id = categories.id
    WHERE categories.name = $1
    `,
    [categoryName]
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
  await pool.query('INSERT INTO categories (name, color) VALUES ($1, $2ps)', [
    category.name,
    category.color,
  ]);
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
    SET name = $2, color = $3
    WHERE id = $1`,
    [category.id, category.name, category.color]
  );
}

module.exports = {
  getItems,
  getItemDetails,
  getCategories,
  getCategory,
  filterItems,
  addItem,
  addCategory,
  updateItem,
  updateCategory,
};
