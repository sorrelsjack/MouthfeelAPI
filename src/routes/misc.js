const express = require('express');
const router = express.Router();

const MiscController = require('../controllers/misc');

router.get('/', MiscController.get_all_misc);

module.exports = router;