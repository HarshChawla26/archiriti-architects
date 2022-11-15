const express  = require('express');
const router  = express.Router();


const feedbackDB  = require('../models/feedback.js');

//Get , Post API
//Base path http://localhost:3000/feedbacks

//get API
router.get('/',(req,res)=>{
    feedbackDB.find({})
    .then((e)=>{
        res.send(e)
    }).catch((err)=>{
        console.log(`Error in Get data${err}`)
    })
});

//post API
router.post('/',(req,res)=>{
    let fdbk = new feedbackDB({
        name : req.body.name,
        email : req.body.email,
        msg : req.body.msg
    });

    fdbk.save((err,doc)=>{
        if(err){
            console.log(`Error in Post data
            ${err}`);
        }else{
            res.send(doc);
        }
    });
});

module.exports = router;