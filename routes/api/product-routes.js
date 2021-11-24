const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category
      , {
        model: Tag
        , through: ProductTag
      }
    ]
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
    , include: [
      Category
      , {
        model: Tag
        , through: ProductTag
      }
    ]
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  Product.create(req.body)
    .then((data) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: data.id
            , tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(data);
    })
    .then((TagIds) => res.status(200).json(TagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((products) => {
      console.log(products);
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
