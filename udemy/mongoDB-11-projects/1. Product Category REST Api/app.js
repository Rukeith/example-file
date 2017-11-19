const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const db = mongojs('catalog', ['products']);

app.use(bodyParser.json())
  .use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Home
app.get('/', (req, res, next) => res.send('Please use /api/products'));

// Fetch All Products
app.get('/api/products', (req, res, next) => {
  db.products.find((err, docs) => {
    if (err) return res.send(err);
    console.info('Products Found...');
    res.json(docs);
  });
});

// Fetch Single Product
app.get('/api/products/:id', (req, res, next) => {
  db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.send(err);
    console.info('Product Found...');
    res.json(doc);
  });
});

// Add Product
app.post('/api/products', (req, res, next) => {
  db.products.insert(req.body, (err, doc) => {
    if (err) return res.send(err);
    console.info('Adding Product..');
    res.json(doc);
  });
});

// Update Product
app.put('/api/products/:id', (req, res, next) => {
  const { name, details, category } = req.body;
  db.products.findAndModify({
    new: true,
    update: { $set: { name, details, category } },
    query: { _id: mongojs.ObjectId(req.params.id) }
  }, (err, doc) => {
    if (err) return res.send(err);
    console.info('Updating Product...');
    res.json(doc);
  });
});

// Delete Product
app.delete('/api/products/:id', (req, res, next) => {
  db.products.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.send(err);
    console.info('Removing Product...');
    res.json(doc);
  });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
