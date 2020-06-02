const express = require('express');
const router = express.Router();

const FoodsController = require('../controllers/foods');

// Get list of all foods -- Include name, id, whatever we want to put on the card
router.get('/', FoodsController.get_all_foods);

// Add a food
router.post('/', FoodsController.add_food);

// Get details on specific food. Flavors, misc, textures, comments, ingredients.
// Actually, get comments via its own endpoint maybe?
// TODO: Maybe, if users are able to add flavors, they must be in the dictionary
router.get('/:id', FoodsController.get_food_details);

// Recommended foods
router.get('/recommended', FoodsController.get_recommended_foods);

// Add flavor -- prolly have another endpoint to add a flavor to the flavor list
router.post('/flavors', FoodsController.add_food_flavor);

// Add texture
router.post('/textures', FoodsController.add_food_texture);

// Add misc attribute
router.post('/misc', FoodsController.add_food_misc);

// Add ingredients
router.post('/ingredients', FoodsController.add_food_ingredients);

// Search for matching foods
router.get('/search', FoodsController.search_foods);

// Flavor, texture, and misc votes

module.exports = router;