const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    name: String,
    employer: String,
    politicalLeaning: String,
    articlesPublished: Number,
    userRatings: [Number],
    majorPublishingHouses: [String],
    imageUrl: String
});

module.exports = mongooseSchema;