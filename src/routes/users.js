import express from 'express';
const router = express.Router();

const UsersController = require('../controllers/users');

router.get('/', UsersController.get_all_users);

router.post('/register', UsersController.register_user);

router.post('/login', UsersController.login);

router.post('/reset-password', UsersController.reset_password);

// Register -- needs logic to make sure UN and email isn't already in the app
// Validate creds
// Reset PW

module.exports = router;