import express from 'express';
const router = express.Router();

const FoodsController = require('../controllers/foods');

// Get list of all foods -- Include name, id, whatever we want to put on the card
router.get('/', FoodsController.get_all_foods);

// Add a food
router.post('/', FoodsController.add_food);

// Get details on specific food. Flavors, misc, textures, comments, ingredients.
// Actually, get comments via its own endpoint maybe?
router.get('/:id', FoodsController.get_food_details);

// Recommended foods
router.get('/recommended', function(req, res) {
    res.send('Recommended foods')
})

// Add flavor
router.post('/flavors', FoodsController.add_food_flavor);

// Add texture
router.post('/textures', FoodsController.add_food_texture);

// Add misc attribute
router.post('/misc', FoodsController.add_food_misc);

// Add ingredients
router.post('/ingredients', FoodsController.add_food_ingredients);

// Search for matching foods
router.get('/search', FoodsController.search_foods);

module.exports = router;