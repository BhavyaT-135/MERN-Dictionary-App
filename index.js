const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const wordRoute = require('./routes/words');
const path = require('path');

dotenv.config();
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.use('/words', wordRoute);

// Deployment to Heroku

__dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
    })
}

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
