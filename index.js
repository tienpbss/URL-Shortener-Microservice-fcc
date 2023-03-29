require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const urlSchema = require('./url-schema')
const isUrl = require('is-url')
const bodyParser = require('body-parser')
const shortid = require('shortid');
const { Url } = require('url');

const app = express();


//connect to atlas
mongoose.connect(process.env.MONGOOSE_URI)


const UrlModel = mongoose.model('url', urlSchema) 

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/getAll', function(req, res) {
  UrlModel.findOne({full: 'https://www.youtube.com/'})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
});

app.get('/api/clear', (req, res) => {
  UrlModel.deleteMany()
    .then(data => {     
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

app.get('/api/shorturl/:short', (req, res) => {
  let shortUrl = req.params.short
  if (isNaN(shortUrl)) {
    res.json({"error":"Wrong format"})
    return
  }
  UrlModel.findOne({short: shortUrl})
    .then(urlSaved => {
      if (!urlSaved) {
        res.json({"error":"No short URL found for the given input"})
      }
      else {
        let fullUrl = urlSaved.full
        res.redirect(fullUrl)
      }
    })
    .catch(err => {
      res.send(err)
    })
})


app.post('/api/shorturl', (req, res) => {
  const fullUrl = req.body.url;
  if (!isUrl(fullUrl)){
    res.json({"error":"Invalid URL"})
    return
  }
  UrlModel.findOne({full: fullUrl}).then(urlSaved => {
    if (!urlSaved){
      let newUrl = new UrlModel({full: fullUrl, short: Math.floor(Math.random()*Math.random()*10000).toString()})
      newUrl.save().then(newUrl => {
        res.json({"original_url": newUrl.full, "short_url": newUrl.short})
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      res.json({"original_url": urlSaved.full, "short_url": urlSaved.short})
    }
  })
  .catch(err => {
    res.send(err)
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
