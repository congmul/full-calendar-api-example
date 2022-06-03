const router = require('express').Router();
const calendarRoutes = require('./calendarRoutes');

router.use('/calendar', calendarRoutes);

module.exports = router;