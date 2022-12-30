const mongoose = require('mongoose');

//Creating the user schema
const wordSchema = new mongoose.Schema({
    word_id: {
        type: Object,
        required: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Word", wordSchema);