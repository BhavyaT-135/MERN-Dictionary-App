const router = require('express').Router();
const Word = require('../models/Word');
const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();
app.use(express.json());

//POST A WORD
router.post('/', async (req, res) => {
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    const word = req.body.word_id;
    await axios.get(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en/${word}`, {
        headers: {
            app_id: process.env.APP_ID,
            app_key: process.env.APP_KEY
        }
    }).then((response) => {
        const word = new Word({
            word_id: response.data
        });
        word.save().then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
})

//GET ALL WORDS
router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    try {
        const words = await Word.find();
        res.status(200).json(words);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET A WORD
router.get('/:word_id', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    const words = await Word.find();
    try {
        // Searching the words array for the word_id that matches the word_id in the params
        const word = await words.find(word => word.word_id.id === req.params.word_id); 
        if (word === undefined || !word) {
            return res.status(404).json({});
        }
        return res.status(200).json(word);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;