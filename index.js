const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// const ReactDOMServer = require("react-dom/server");
// const StaticRouter = require("react-router-dom/server");
const mongoose = require('./data.js');
const qroutes = require('./routes/quotes.js');
const froutes = require('./routes/feedback.js');
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.static(path.join(__dirname+'/dist/build')));
app.use(bodyParser.json());
app.set('view engine', 'html');

app.use('/quotes',qroutes);
app.use('/feedbacks',froutes);


app.get("/projects",(req,res)=>{
  res.sendFile(path.join(__dirname+'/dist/build/index.html'));
})
app.get("/contactus",(req,res)=>{
  res.sendFile(path.join(__dirname+'/dist/build/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})