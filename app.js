require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const indexRouter = require('./routes/index');
const categoriesRouter = require('./routes/categories');
const itemsRouter = require('./routes/items');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500);
  res.render('error', { message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5434;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
