import express from 'express';
const router = express.Router();

const FlavorsController = require('../controllers/flavors');

router.get('/', FlavorsController.get_all_flavors);

module.exports = router;