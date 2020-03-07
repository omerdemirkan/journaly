const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-omer:1907Fbfb@cluster0-jgx0j.mongodb.net/ijdb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to mongoDB atlas');
})
.catch(() => {
    console.log('Error in connecting to mongoDB atlas');
});

const journalistRouter = require('./routes/journalist');

app.use('/api/journalist', journalistRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Yoo we live');
});