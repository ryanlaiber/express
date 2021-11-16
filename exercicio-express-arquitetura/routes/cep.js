const express = require('express');
const router = express.Router();

const getCep = require('../controllers/ceps');

router.get('/:cep', getCep);

module.exports = router;
