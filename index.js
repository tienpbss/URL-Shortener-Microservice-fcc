require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const urlSchema = require('./url-schema')
const isUrl = require('is-url')

const app = express();


//connect to atlas
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const Url = mongoose.model('Urli', urlSchema)

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res => {

}))

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
