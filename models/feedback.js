const mongoose = require('mongoose');

const feedback = mongoose.model('feedback',{
    name : {type:String},
    email : {type:String},
    msg : {type:String}
});

module.exports = feedback;