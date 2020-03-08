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

    if (journalistName) {
        Journalist.findOne({name: journalistName}, (err, foundJournalist) => {
            if (err) return res.status(400);
    
            if (foundJournalist) {
                res.json(foundJournalist);
            }
        });
    } else {
        const searchList = req.header('searchList').split(',');
        Journalist.findOne({name: {$in: searchList}}, (err, foundJournalist) => {
            if (err) return res.json(400);

            console.log(foundJournalist);

            res.json(foundJournalist);
        });
    }
    
});

module.exports = router;