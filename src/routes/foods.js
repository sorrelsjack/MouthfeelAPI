import express from 'express';
const router = express.Router();

const FoodsController = require('../controllers/foods');

// Get list of all foods
router.get('/', FoodsController.get_all_foods);

// Add a food
router.post('/', FoodsController.add_food);

// Get details on specific food. Flavors, misc, textures, comments, ingredients.
router.get('/:id', FoodsController.get_food);

// Recommended foods
router.get('/recommended', function(req, res) {
    res.send('Recommended foods')
})

// Add flavor

// Add ingredients

// Add misc attribute

// Search for matching foods

module.exports = router;