const express  = require('express');
const router  = express.Router();


const feedbackDB  = require('../models/feedback.js');

//Get , Post API
//Base path http://localhost:3000/feedbacks

//get API
router.get('/',(req,res)=>{
    feedbackDB.find({})
    .then((e)=>{
        res.send({message:"This is a feedback route"})
    }).catch((err)=>{
        res.status(400).send({message:"Error occured"});
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
            
            res.status(400).send({message:`error occured : ${err}`});
        }else{
            res.status(200).send({message:"Data is posted"});
        }
    });
});

module.exports = router;