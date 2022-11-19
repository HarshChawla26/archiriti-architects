const express  = require('express');
const router  = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

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
    if(ObjectId.isValid(req.params.id)){
        quotedb.findById(req.params.id,(err,doc)=>{
            if(err){
                console.log(`Error in Get data by Id ${err}`);
            }else{
                res.send(doc);
            }
        })
    }else{
        return res.status(400).send('No record found with id ' + req.params.id)
    }

    quotedb.find((err,doc)=>{
        if(err){
            console.log(`Error in Get data${err}`);
        }else{
            res.send(doc);
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