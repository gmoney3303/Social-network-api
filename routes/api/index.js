const router = require('express').Router();
const thoughtsRoutes = require('./thoughts');
const userRoutes = require('./user');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;