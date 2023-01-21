const express  = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');

let otpString = "";
function randomOTP(){
    let one = Math.floor(Math.random()*100).toString()
    let two = Math.floor(Math.random()*100).toString()
    let three = Math.floor(Math.random()*100).toString();
    otpString+=one;
    otpString+=two;
    otpString+=three;
    return otpString;
}

router.post('/',async (req,res)=>{
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
        return res.status(200).json({message:"Data is posted",otp:otpString})
    }).catch(err=>{
        return  res.status(500).json({message:err});
    })
})

module.exports = router;