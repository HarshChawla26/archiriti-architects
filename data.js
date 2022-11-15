const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// console.log(first)
mongoose.connect(`${process.env.MONGO_URL}`,(err)=>{
    if(!err){
        console.log('connection successful')
    }else{
        console.log('Error in connection' + err)
    } 
});

module.exports = mongoose;