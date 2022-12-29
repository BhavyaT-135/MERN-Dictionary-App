const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const wordRoute = require('./routes/words');

dotenv.config();
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.use('/api/words', wordRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
