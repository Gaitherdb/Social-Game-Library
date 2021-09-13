const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const friendRoutes = require('./friendRoutes')

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/friends', friendRoutes);



module.exports = router;
