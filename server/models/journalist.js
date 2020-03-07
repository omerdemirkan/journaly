const mongoose = require('mongoose');
const journalistSchema = require('./schemas/journalistSchema');

const Journalist = mongoose.model('Journalist', journalistSchema);

module.exports = Journalist;