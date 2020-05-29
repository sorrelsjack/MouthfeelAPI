import express from 'express';
const router = express.Router();

const TexturesController = require('../controllers/textures');

router.get('/', TexturesController.get_all_textures);

module.exports = router;