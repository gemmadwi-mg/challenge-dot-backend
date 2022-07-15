const express = require('express');
const router = express.Router();
const gameRoutes = require('./usergames.route');
const gamebiodataRoutes = require('./usergamebiodata.route');
const gamehistoryRoutes = require('./usergamehistory.route');

router.use('/usergame', gameRoutes);
router.use('/usergamebiodata', gamebiodataRoutes);
router.use('/usergamehistory', gamehistoryRoutes);

module.exports = router;