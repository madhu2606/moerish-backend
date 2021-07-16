const express = require('express');
const router = express.Router();

router.use('/users', require('./usersRouter'));
router.use('/items', require('./itemsRouter'));

module.exports = router;