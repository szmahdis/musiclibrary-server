const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const path = require('path')
const songs = [
    {
        id: "s0000",
        artist: "Paramore",
        title: "Aint It Fun",
        album: "Paramore",
        cover: "paramore.jpg"
    },
    {
        id: "s0001",
        artist: "Florence + The Machine",
        title: "Dog Days Are Over",
        album: "Lungs",
        cover: "florence_and_the_machine.jpg"
    },
    {
        id: "s0002",
        artist: "London Grammar",
        title: "Wasting My Youngs Years",
        album: "If You Wait",
        cover: "london_grammar.jpg"
    },

    {
        id: "s0003",
        artist: "Hasan Shamaizadeh",
        title: "Bishtar Bishtar",
        album: "Khodafez",
        cover: "shamaizadeh_khodahafez.jpg"
    }
]


app.get('/songs', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Question what does this do?
  res.json(songs)
})


//TODO bejaye songs, id ro bargadun ke efficient tar beshe
// yani kole ahangaro bad nagardun, object ro bargardun.
// /songs/:id 

app.get('/images/:filename', (req, res) => {
    const fileName = req.params.filename

    fs.readFile(`./images/${fileName}`, (err, data) => {
        if (err) throw err;
        res.send(data);
      });

    //   getImage(filename).then((data) => {
    //     // kari ke ba data mishe anjam dad
    //    res.send(data)
    //    }).catch((err) => {
    //    // `error mide
    //    res.send('ERROR')
    //    })
})

app.get('/audio/:trackId', (req,res) => {
    const trackId = req.params.trackId
    res.sendFile(path.resolve(`./audio/${trackId}`))
    res.setHeader('Access-Control-Allow-Origin', '*');
    //todo send this to client and play it
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})