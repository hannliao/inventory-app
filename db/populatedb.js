require('dotenv').config();
const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS origami (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30),
    src VARCHAR(255),
    price INTEGER,
    qty INTEGER
  );

  CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    color VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS origami_colors (
    origami_id INTEGER,
    color_id INTEGER,
    PRIMARY KEY (origami_id, color_id),
    FOREIGN KEY (origami_id) REFERENCES origami(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
  );
`;

const insertSQL = `
  INSERT INTO origami (name, src, price, qty) VALUES
    ('ribbon', 'img/ribbon.svg', 9, 18),
    ('kangaroo', 'img/kangaroo.svg', 12, 15),
    ('dragon', 'img/dragon.svg', 15, 9),
    ('elephant', 'img/elephant.svg', 20, 1),
    ('giraffe', 'img/giraffe.svg', 12, 6),
    ('star', 'img/star.svg', 17, 20),
    ('cactus', 'img/cactus.svg', 12, 13),
    ('penguin', 'img/penguin.svg', 15, 8),
    ('diamond', 'img/diamond.svg', 9, 10),
    ('heart', 'img/heart.svg', 9, 8),
    ('hat', 'img/hat.svg', 9, 7),
    ('unicorn', 'img/unicorn.svg', 17, 14);

  INSERT INTO colors (color) VALUES
    ('pink'),
    ('orange'),
    ('yellow'),
    ('green'),
    ('blue'),
    ('purple'),
    ('grey');

  INSERT INTO origami_colors (origami_id, color_id) VALUES
    (1, 3),
    (2, 2),
    (3, 1),
    (4, 7),
    (5, 2),
    (6, 1),
    (6, 3),
    (6, 4),
    (6, 5),
    (6, 6),
    (7, 4),
    (7, 7),
    (8, 7),
    (8, 3),
    (9, 6),
    (10, 1),
    (11, 5),
    (12, 6),
    (12, 3);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT current_database()');
    console.log('connected to database: ', res.rows[0].current_database);
  } catch (err) {
    console.error('error connecting to the database: ', err);
  }

  try {
    await client.query(SQL);
    await client.query(insertSQL);
    console.log('table created!');
  } catch (err) {
    console.error('error creating table: ', err);
  }

  await client.end();
  console.log('done');
}

main();
