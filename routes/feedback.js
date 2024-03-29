const express  = require('express');
const router  = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const feedbackDB  = require('../models/feedback.js');

//Get , Post API
//Base path http://localhost:3000/feedbacks

//get API
router.get('/',(req,res)=>{
    feedbackDB.find()
    .then((e)=>{
        res.send({message:"This is feedback API"})
    }).catch((err)=>{
        res.status(400).send({message:"Error occured"});
    })
});


//post API
router.post('/',async (req,res)=>{
    let fdbk = new feedbackDB({
        name : req.body.name,
        email : req.body.email,
        msg : req.body.msg
    });
    await fdbk.save((err,doc)=>{
        if(err){
            return res.status(400).send({message:`error occured : ${err}`});
        }
    });
    
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.PassCode
        }
    });
    
    let info = transporter.sendMail({
        from: `${process.env.Email}`,
        to:`${fdbk.email}`, 
        subject:'Thank You for your feedback😊😊',
        text:`Hello ${fdbk.name},
        
Thank you for your valuable feedback.

We truly value your feedback and time you took to review us. Your feedback helps us improve our service for everyone.
If you’d like to discuss how we could’ve made your experience better, please call us at +91-9416172811 or reply to this email.

In case of any query we'll reply back to you within 24 hrs.

We look forward to hearing from you again!😊

Have a wonderful day!

Kind regards,

Ar. Jagdish chawla
Archiriti architects
Ambala Cantt.
Haryana-133001
`
    }).then((info)=>{
        return res.status(200).json({message:"Data is posted"})
    }).catch(err=>{
        return  res.status(500).json(err);
    })
    let mail = transporter.sendMail({
        from: `${process.env.Email}`,
        to:`${process.send.adminEmail}`, 
        subject:'Feedback/Review from a client',
        text:`Hello Jagdish sir,
        
A new feedback is given by ${fdbk.name}

The msg is as follows "${fdbk.msg}"
If you’d like to contact the client you can reach them out on ${fdbk.email}

Have a wonderful day!

Kind regards,

Archiriti architects
Ambala Cantt.
Haryana-133001
`
    }).then((info)=>{
        return res.status(200).json({message:"Data is posted"})
    }).catch(err=>{
        return  res.status(500).json(err);
    });
});

module.exports = router;