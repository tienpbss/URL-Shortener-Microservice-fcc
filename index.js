require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const urlSchema = require('./url-schema')
const isUrl = require('is-url')
const bodyParser = require('body-parser')

const app = express();


//connect to atlas
mongoose.connect(process.env.MONGOOSE_URI)


// dat ten ben trong la urli de sau su dung test xem khi nao thi dung url, khi nao dung urli
const Url = mongoose.model('Urli', urlSchema) 

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json())
// app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const fullUrl = req.body.url;
  console.log(req.body, fullUrl)
  res.send()
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
