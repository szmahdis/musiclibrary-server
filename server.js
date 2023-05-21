const express = require('express');
const cors = require('cors');
const fs = require('fs')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://musiclibrary:DnfzhslnITmzrF4n@cluster0.kbxd4k0.mongodb.net/"

app.use(express.json()); //Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all routes


app.get('/songs', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const client = new MongoClient(uri);
  await client.connect();

  const database = client.db('musiclibrary');
  const collection = database.collection('songs');
  const songs = await collection.find().toArray()
  await client.close();
  res.json(songs)

})


app.get('/images/:filename', (req, res) => {
  const fileName = req.params.filename
  fs.readFile(`./images/${fileName}`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });

})

app.get('/audio/:trackId', (req, res) => {
  const trackId = req.params.trackId
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.resolve(`./audio/${trackId}.mp3`))
})

app.get('/liked', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const client = new MongoClient(uri);
  await client.connect();

  const database = client.db('musiclibrary');
  const collection = database.collection('favorites');
  const favorites = await collection.find().toArray()
  await client.close();
  res.json(favorites);

})



app.post('/liked', async (req, res) => {
  const { id, liked } = req.body;
  console.log(id, liked)

    const client = new MongoClient(uri);
    await client.connect();
  
    const database = client.db('musiclibrary');
    const collection = database.collection('favorites');
    await collection.findOneAndUpdate(
      {songId: id},
      {$set: {isLiked: liked}},
      {upsert: true, returnOriginal: false}
    )

    console.log('Inserted new favorite');
    await client.close();

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})