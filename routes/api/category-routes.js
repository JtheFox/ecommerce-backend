const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    if(!data) return res.status(404).json({message: 'No categories found'});
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    if(!data) return res.status(404).json('No category found for this id');
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create({
      category_name: req.body.category_name
    });
    if(!data) return res.status(500);
    return res.status(200);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!data) return res.status(404).json('No category found for this id');
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!data) return res.status(404).json('No category found for this id');
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

module.exports = router;
