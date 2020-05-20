import express from 'express';
const router = express.Router();

const UsersController = require('../controllers/users');

router.get('/', UsersController.get_all_users);

// Register -- needs logic to make sure UN and email isn't already in the app
// Validate creds
// Reset PW

module.exports = router;