const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get post
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://utkow1991:utkow_1991@cluster0-ympqd.mongodb.net/vue_express?retryWrites=true', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}


module.exports = router;