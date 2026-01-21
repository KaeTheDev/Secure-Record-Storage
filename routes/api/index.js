const router = require('express').Router();
const userRoutes = require('../api/userRoutes');
const noteRoutes = require('../api/noteRoutes');
 
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
 
module.exports = router;