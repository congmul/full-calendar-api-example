const path = require('path');
const router = require('express').Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/calendar.html'));
});

module.exports = router; 