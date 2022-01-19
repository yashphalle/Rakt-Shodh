const mongoose=require('mongoose');
const express=require('express');
const ejs=require('ejs');
const app=express();
const path=require('path');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const { stringify } = require('querystring');
app.set('view engine','ejs');
app.use('/public', express.static('public'));

mongoose.connect("mongodb+srv://bloodadmin:1234@cluster0.mre6e.mongodb.net/blooddata?retryWrites=true&w=majority");
const blooddataSchema={
    name:String,
    bg:String,
    city:String,
    number:String
    
}
const Blood =mongoose.model('blooddata',blooddataSchema);

const bloodbankSchema={
    bloodbankname:String,
    bid:Number,
    city:String,
    a_pos:Number,
    b_pos:Number,
    o_pos:Number,
    ab_pos:Number,
    a_neg:Number,
    b_neg:Number,
    o_neg:Number,
    ab_neg:Number,
    
}
const Bank =mongoose.model('bloodbank',bloodbankSchema);

//table of all blood donors
app.get('/dir',(req,res)=>{
    Blood.find({},function(err,blooddata){
        res.render('dir',{
            bloodList:blooddata
        })
    })
    
})
//table of all blood banks

app.get('/bloodbankdir',(req,res)=>{
    Bank.find({},function(err,bloodbank){
        res.render('bloodbankdir',{
            bloodbanklist:bloodbank
        })
    })
    
})
//find blood bank option form
app.get('/findbloodbank',(req,res)=>{
    
    res.render('findbloodbank')
})


//after submitiing option form of find blood bank
app.post('/findbloodbank',(req,res)=>{
    gstate=req.body.state;
    gcity=req.body.city;
    gbloodgroup=req.body.bloodgroup;
    
    
    const findbloodbank=async()=>{
    var bloodbanklist;
        switch (gbloodgroup) {
            case "a_pos":
                const bloodbanklista_pos= await Bank.find({       $and:[          {city:gcity},  { a_pos:{$gt:0}}        ]           });
               bloodbanklist= bloodbanklista_pos
                res.render('resultbloodbank',{bloodbanklist})
                break;
            case "b_pos":
                const bloodbanklistb_pos= await Bank.find({       $and:[          {city:gcity},  { b_pos:{$gt:0}}        ]           });
                bloodbanklist =bloodbanklistb_pos
                res.render('resultbloodbank',{bloodbanklist})
                break;
            case "o_pos":
                const bloodbanklisto_pos= await Bank.find({       $and:[          {city:gcity},  { o_pos:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklisto_pos
                res.render('resultbloodbank',{bloodbanklist})
                break;
            case "ab_pos":
                const bloodbanklistab_pos= await Bank.find({       $and:[          {city:gcity},  { ab_pos:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklistab_pos
                res.render('resultbloodbank',{bloodbanklist})
                break; 
            case "a_neg":
                const bloodbanklista_neg= await Bank.find({       $and:[          {city:gcity},  { a_neg:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklista_neg
                res.render('resultbloodbank',{bloodbanklist})
                break;  
            case "b_neg":
                const bloodbanklistb_neg= await Bank.find({       $and:[          {city:gcity},  { b_neg:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklistb_neg
                res.render('resultbloodbank',{bloodbanklist})
                break;            
            case "o_neg":
                const bloodbanklisto_neg= await Bank.find({       $and:[          {city:gcity},  { o_neg:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklisto_neg
                res.render('resultbloodbank',{bloodbanklist})
                break;
            case "ab_neg":
                const bloodbanklistab_neg= await Bank.find({       $and:[          {city:gcity},  { ab_neg:{$gt:0}}        ]           });
                bloodbanklist=bloodbanklistab_neg
                res.render('resultbloodbank',{bloodbanklist})
                break;           
            default:
                bloodbanklist= await Bank.find({          city:gcity,            });
                res.render('resultbloodbank',{bloodbanklist})
                break;
        }
    
        
    }
    findbloodbank();
    
    })

//for displaying option form
app.get("/request",(req,res)=>{
        res.render('request')
    })


//after submitting option form    
app.post("/request",(req,res)=>{
    const sendsms=async()=>{
    gstate=req.body.state;
    gcity=req.body.city;
    gbloodgroup=req.body.bloodgroup;
    var donerlist;
    switch (gbloodgroup) {
        case "a_pos":
            const a_pos_doner= await Blood.find({   $and:[  {bg:"a_pos"},    {city:gcity}  ]     })
            donerlist=a_pos_doner;
            break;
        case "b_pos":
            const b_pos_doner= await Blood.find({$and:  [{bg:"b_pos"},{city:gcity}]})
            donerlist=b_pos_doner;
            break;
        case "o_pos":
            const o_pos_doner= await Blood.find({$and:  [{bg:"o_pos"},{city:gcity}]})
            donerlist=o_pos_doner;
            break;
        case "ab_pos":
            const ab_pos_doner= await Blood.find({$and:  [{bg:"ab_pos"},{city:gcity}]})
            donerlist=ab_pos_doner;
            break;
    
        case "a_neg":
            const a_neg_doner= await Blood.find({$and:  [{bg:"a_neg"},{city:gcity}]})
            donerlist=a_neg_doner;
            break;
        case "b_neg":
            const b_neg_doner= await Blood.find({$and:  [{bg:"b_neg"},{city:gcity}]})
            donerlist=b_neg_doner;
            break;
        case "o_neg":
            const o_neg_doner= await Blood.find({$and:  [{bg:"o_neg"},{city:gcity}]})
            donerlist=o_neg_doner;
            break;
        case "ab_neg":
            const ab_neg_doner= await Blood.find({$and:  [{bg:"ab_neg"},{city:gcity}]})
            donerlist=ab_neg_doner;
            break;
        default:
            
                const z_neg_doner= await Blood.find({ bg:a_neg})
                donerlist=z_neg_doner;
                break;
            
    }
    donerlist.forEach(donerdata=>
        {
        var gnumber=donerdata.number
        const Vonage = require('@vonage/server-sdk')
        
            const vonage = new Vonage({
              apiKey: "48a9d9d9",
              apiSecret: "uybxdDjP3mjqeCK4"
            })
            
            const from = "Vonage APIs"
            const to = gnumber
            
            // const to = "918329073587"
            const text = `HELP!! urgent need of ${gn=gbloodgroup} blood group in your area. Please donate blood you are getting chance to save life `
            
            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log("Message sent successfully.");
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    }
                }
            })
        
            
          
            
      })
      }
        
      
      
        sendsms();
        res.send("sms sent!!")
      })



app.listen(3000,function(){
    console.log("connected........");

})