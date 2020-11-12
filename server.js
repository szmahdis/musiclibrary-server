const express = require('express')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const { MongoClient } = require('mongodb'); 


const uri = "mongodb+srv://musiclibrary-server:7ZUxHXUb37YD851J@cluster0.u5jqa.mongodb.net/musiclibrary?retryWrites=true&w=majority";

const client = new MongoClient(uri);

app.get('/songs', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
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

app.get('/audio/:trackId', (req,res) => {
    const trackId = req.params.trackId
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.resolve(`./audio/${trackId}.mp3`))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})