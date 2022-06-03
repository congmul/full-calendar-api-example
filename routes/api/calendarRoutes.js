const router = require('express').Router();

const fs =require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/', async (req, res) => {
    const data = await readFileAsync('db/calendar.json', 'utf-8')
    res.json(JSON.parse(data))
});

module.exports = router;