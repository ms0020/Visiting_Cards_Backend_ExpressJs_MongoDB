const express = require('express');

const authRoutes = require('./routes/authRoutes.js');
const visitingCardRoutes = require('./routes/visitingCardRoutes.js');

const router = express();

router.use('/api/auth', authRoutes);
router.use('/api/visiting_card', visitingCardRoutes);


module.exports = router;