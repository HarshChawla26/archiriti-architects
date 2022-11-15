const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./data.js');
const qroutes = require('./routes/quotes.js');
const froutes = require('./routes/feedback.js');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000;


app.use(cors()); 

app.use(express.static(path.join(__dirname+'/dist/build')));
app.use(bodyParser.json());

app.get('/',(req,res,next)=>{
  res.render(path.join(__dirname+'/dist/build'+'index.html'));
})
  
  
  app.use('/quotes',qroutes);
  app.use('/feedbacks',froutes);
  app.get("*",(req,res)=>{
    res.status(404).send("Error:404 Page not found!")
  })

app.listen(port, () => {
  console.log(`Example app listening on port https://archiritiarchitects.herokuapp.com/`)
})