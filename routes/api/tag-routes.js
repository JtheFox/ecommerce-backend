const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });
    if(!data) return res.status(404).json({message: 'No categories found'});
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    });
    if(!data) return res.status(404).json({message: 'No tag found for this id'});
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name
    });
    if(!data) return res.status(500);
    return res.status(200);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!data) return res.status(404).json('No tag found for this id');
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!data) return res.status(404).json('No tag found for this id');
    return res.json(data);
  } catch(err) {
    res.status(500).json('There was an error with your request');
  }
});

module.exports = router;
