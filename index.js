const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./data.js');
const qroutes = require('./routes/quotes.js');
const froutes = require('./routes/feedback.js');
const vrfy = require('./routes/verifyOtp.js');
const path = require('path');
const app = express()

const port =process.env.PORT||3000;
// console.log(mongoose.connect()
app.use(cors()); 
app.use(express.static(path.join(__dirname+'/dist/build')));
app.use(bodyParser.json());

app.use('/quotes',qroutes);
app.use('/feedbacks',froutes);

// app.get('/verify',(req,res)=>{
//   res.send("Hii")
// });

app.use('/verify',vrfy);

app.get("/projects",(req,res)=>{
  res.sendFile(path.join(__dirname+'/dist/build/index.html'));
})
app.get("/contactus",(req,res)=>{
  res.sendFile(path.join(__dirname+'/dist/build/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})