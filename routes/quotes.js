const express  = require('express');
const router  = express.Router();

const quotedb  = require('../models/quotes');

//Get , Post API
//Base path http://localhost:3000/quotes

//get API
router.get('/',(req,res)=>{
    quotedb.find((err,doc)=>{
        if(err){
            console.log(`Error in Get data${err}`);
        }else{
            res.send(doc);
        }
    })
});

//get single quote API
router.get('/:id',(req,res)=>{

    const {id} = req.params;
    quotedb.find({qRef:parseInt(id)},(err,doc)=>{
        if(err){
            res.send({
                "_id":"",
                "qRef":0,
                "content":"",
                "author":"",
                "__v":0
            })
            console.log(`Error in Get data${err}`);
        }else{
            res.send(doc[0]);
        }
    })
});

//post API
router.post('/',(req,res)=>{
    let quote = new quotedb({
        "qRef" : req.body.qRef,
        "content" : req.body.content,
        "author" : req.body.author
    });

    quote.save((err,doc)=>{
        if(err){
            console.log(`Error in Post data${err}`);
        }else{
            res.send({message:"The quote is posted"});
        }
    });
});
module.exports = router;