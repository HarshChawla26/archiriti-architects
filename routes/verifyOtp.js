const express  = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

function randomOTP(){
    let one = Math.floor(Math.random()*100)
    let two = Math.floor(Math.random()*100)
    let three = Math.floor(Math.random()*100)

    return ""+one+two+three;
}

router.get('/',async (req,res)=>{
    const fdbk = req.body;
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
        subject:'Email Verifiction code',
        text:`Hello ${fdbk.name},
        
Your Email Verification code for archiriti architects website is ${randomOTP()}.

Have a nice day!

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
})

module.exports = router;