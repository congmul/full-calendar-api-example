const router = require('express').Router();
const { v4: UUID} = require('uuid');
const fs =require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/', async (req, res) => {
    const result = await readFileAsync('db/calendar.json', 'utf-8')
    res.json(JSON.parse(result))
});

router.post('/', async (req, res) => {
    const events = JSON.parse(await readFileAsync('db/calendar.json', 'utf-8'));
    events.push(req.body);
    const result = await writeFileAsync('db/calendar.json', JSON.stringify(events));
    res.json(JSON.stringify(result))
});

router.put('/:eventId', async (req, res) => {
    const events = JSON.parse(await readFileAsync('db/calendar.json', 'utf-8'));
    const updated = events.filter(event => event.id !== req.params.eventId)
    updated.push(req.body);
    const result = await writeFileAsync('db/calendar.json', JSON.stringify(updated));
    res.json(JSON.stringify(result))
});

router.delete('/:eventId', async (req, res) => {
    const events = JSON.parse(await readFileAsync('db/calendar.json', 'utf-8'));
    const deleted = events.filter(event => event.id !== req.params.eventId)
    const result = await writeFileAsync('db/calendar.json', JSON.stringify(deleted));
    res.json(JSON.stringify(result))
});

module.exports = router;