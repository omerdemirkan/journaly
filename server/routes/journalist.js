const router = require('express').Router();

const Journalist = require('../models/journalist');

router.post('/', (req, res) => {
    const journalist = req.body.journalist;

    const newJournalist = new Journalist(journalist);

    newJournalist.save(err => {
        if (err) return res.status(400);

        res.json('journalist successfully saved');
    });
});

router.get('/', (req, res) => {
    const journalistName = req.query.name;

    Journalist.findOne({name: journalistName}, (err, foundJournalist) => {
        if (err) return res.status(400);

        if (foundJournalist) {
            res.json(foundJournalist);
        }
    });
});

module.exports = router;