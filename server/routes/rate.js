const router = require('express').Router();

const Journalist = require('../models/journalist');

router.post('/:id', (req, res) => {
    const journalistId = req.params.id;

    const userRating = req.body.rating;
    const userReview = req.body.review;

    Journalist.findById(journalistId, (error, journalist) => {
        if (error) return res.status(400);

        journalist.userRatings.push(userRating);
        journalist.userReviews = journalist.userReviews.concat([userReview]);

        journalist.save((err, savedJournalist) => {
            if (err) return res.status(400);

            res.json(savedJournalist._id);
        });
    });
});

module.exports = router;