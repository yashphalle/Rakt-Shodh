const mongoose=require('mongoose');

const express=require('express');
const ejs=require('ejs');
const app=express();
const path=require('path');
var bodyParser=require("body-parser");
const { stringify } = require('querystring');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const http = require('http'); 
const hostname = '127.0.0.1'; 

mongoose.connect("mongodb+srv://bloodadmin:1234@cluster0.mre6e.mongodb.net/blooddata?retryWrites=true&w=majority");
const blooddataSchema={
    name:String,
    bg:String,
    city:String,
    number:String
    
}

const Blood =mongoose.model('blooddata',blooddataSchema);
//bloodbanks collection initialization
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
const eventdataSchema={
    oname:String,
    odate:String,
    ostate:String,
    ocity:String,
    ovenue:String,
    obloodgroup:String,
    onumber:String
}

const event=mongoose.model('eventdata',eventdataSchema);
app.get('/',function(req,res){
res.render('index')
})


const requestdataSchema={
    rname:String,
    rstate:String,
    rcity:String,
    rbg:String,
    rnumber:String
    
}

const Request =mongoose.model('requestdata',requestdataSchema);


app.get('/dir',(req,res)=>{
    Blood.find({},function(err,blooddata){
        res.render('dir',{
            bloodList:blooddata
        })
    })
    
})

app.get('/bloodbankdir',(req,res)=>{
    Bank.find({},function(err,bloodbank){
        res.render('bloodbankdir',{
            bloodbanklist:bloodbank
        })
    })
    
})



app.get("/admin_new",(req,res)=>{
    res.render('admin_new')
})


app.get("/admin_new2",(req,res)=>{
    res.render('admin_new2')
})

app.get("/dashboard",(req,res)=>{
    res.render('dashboard')
})

app.get("/login",(req,res)=>{
    res.render('login')
})


app.get("/user_dashboard",(req,res)=>{
    res.render('user_dashboard')
})



app.post('/admin',(req,res)=>{
    rusername=req.body.username;
    rpassword=req.body.password;
       if (rusername==='admin' && rpassword==='1234') {
        Bank.find({},function(err,bloodbank){
            res.render('admin',{
                bloodbanklist:bloodbank
            })
            })
       }
       
    
})
app.get("/admin2",(req,res)=>{
    Bank.find({},function(err,bloodbank){
        res.render('admin',{
            bloodbanklist:bloodbank
        })
        })
})

// app.post("/find",(req,res)=>{
    
// var gname=req.body.name;
// // var result= Blood.findOne({gname})
//     // res.send(`Full name is:${req.body.name}.`);
//     // res.render('find',{result});
// // res.send(`${Blood.findOne({gname})}`);
//     // var gname=req.body.name;
//     // console.log(gname);
//     // res.send(gname)
//     // 
//     var result= Blood.find({name:`${gname}`},function(err,blooddata){ 
//         res.send(result.name)
//     })  
   
   


// })

//for finding user//
app.post('/find',(req,res)=>{
    try{
        var gname=req.body.name;
       const find=async()=>{
        const resultdata= await Blood.find({name :gname });
        res.render('find',{resultList:resultdata})
       }
       
        find();
        // res.render('index',{
        //     bloodList:result
        // })
    }
    catch(e){
        res.sendStatus(500).send(e);
    }

})

//for sending sms from name
// app.post('/sms',(req,res)=>{

//     var gname2=req.body.name2;

//     const find=async()=>{
//     const resultdata2= await Blood.find({name :gname2 });
//     //-------------------------------------------------------
//     const resultList2=resultdata2;
//     resultList2.forEach(resultdata2=>{
//     var gnumber=resultdata2.number
//     const Vonage = require('@vonage/server-sdk')
    
//         const vonage = new Vonage({
//           apiKey: "48a9d9d9",
//           apiSecret: "uybxdDjP3mjqeCK4"
//         })
        
//         const from = "Vonage APIs"
//         const to = gnumber
        
//         // const to = "918329073587"
//         const text = `hiii ${gname2}`
        
//         vonage.message.sendSms(from, to, text, (err, responseData) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if(responseData.messages[0]['status'] === "0") {
//                     console.log("Message sent successfully.");
//                 } else {
//                     console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//                 }
//             }
//         })
    
        
//         }
        
//     )}

    
//     find();
//     res.send("SMS Send successfully!!!")
//     // res.render('sms',{resultList2:resultdata2})    
// })




// app.get('/sms',(req,res)=>{
//     res.send("sent")
//     const Vonage = require('@vonage/server-sdk')

//     const vonage = new Vonage({
//       apiKey: "48a9d9d9",
//       apiSecret: "uybxdDjP3mjqeCK4"
//     })
//     number="+919075341267"
//     const from = "Vonage APIs"
//     const to = number
    
//     // const to = "918329073587"
//     const text = 'hiii'
    
//     vonage.message.sendSms(from, to, text, (err, responseData) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if(responseData.messages[0]['status'] === "0") {
//                 console.log("Message sent successfully.");
//             } else {
//                 console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//             }
//         }
//     })


// })



app.get('/findbloodbank',(req,res)=>{
    app.use('/public', express.static('public'));
    res.render('findbloodbank')
})

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

app.get("/request",(req,res)=>{
    res.render('request')
})

app.post("/request",(req,res)=>{


    // let newrequest=new Request({
    //     rname:req.body.rname,       
    //     rstate:req.body.rstate,
    //     rcity:req.body.rcity,
    //     rbg:req.body.rbloodgroup,
    //     rnumber:req.body.rnumber
    // });
    //     newrequest.save();
    const sendsms=async()=>{

gstate=req.body.rstate;
gcity=req.body.rcity;
gbloodgroup=req.body.rbloodgroup;
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
                
                    const z_neg_doner= await Blood.find({ bg:"a_neg"})
                    donerlist=z_neg_doner;
                    break;
                
        }

        donerlist.forEach(donerdata=>
            {
            var gnumber=donerdata.number;
          
            

            const accountSid = 'AC5e289c8926743ec2f28fc3b41fd5d01b'; 
            const authToken = '8e00b644e93690125de971a68bae3e6e'; 
            const client = require('twilio')(accountSid, authToken); 
          
                client.messages
                    .create({
                        body: 'Help !! Urgent need of blood with your matching blood group. Please donate blood you have chance to save a life.For donation visit Rakt-Shodh Website or contact nearest blood bank',
                        messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5', 
                        to: `${gnumber}`,
                        
                    })
                    .then(message => console.log(message.sid));
              
                    
         })
        
        }
sendsms();

res.render('smsnotification')
                
})

// app.get("/request2",(req,res)=>{

// const sendsms=async()=>{
// gstate=req.body.state;
// gcity=req.body.city;
// gbloodgroup=req.body.bloodgroup;
// var donerlist;


// Request.find({},function(err,requestdata){
   
//         requestList:requestdata
    
// })

// requestList.forEach(requestdata=>{
//     var gcity=requestdata.rcity;
//     var gbloodgroup=requestdata.rbg
// switch (gbloodgroup) {
//     case "a_pos":
//         const a_pos_doner= await Blood.find({   $and:[  {bg:"a_pos"},    {city:gcity}  ]     })
//         donerlist=a_pos_doner;
//         break;
//     case "b_pos":
//         const b_pos_doner= await Blood.find({$and:  [{bg:"b_pos"},{city:gcity}]})
//         donerlist=b_pos_doner;
//         break;
//     case "o_pos":
//         const o_pos_doner= await Blood.find({$and:  [{bg:"o_pos"},{city:gcity}]})
//         donerlist=o_pos_doner;
//         break;
//     case "ab_pos":
//         const ab_pos_doner= await Blood.find({$and:  [{bg:"ab_pos"},{city:gcity}]})
//         donerlist=ab_pos_doner;
//         break;

//     case "a_neg":
//         const a_neg_doner= await Blood.find({$and:  [{bg:"a_neg"},{city:gcity}]})
//         donerlist=a_neg_doner;
//         break;
//     case "b_neg":
//         const b_neg_doner= await Blood.find({$and:  [{bg:"b_neg"},{city:gcity}]})
//         donerlist=b_neg_doner;
//         break;
//     case "o_neg":
//         const o_neg_doner= await Blood.find({$and:  [{bg:"o_neg"},{city:gcity}]})
//         donerlist=o_neg_doner;
//         break;
//     case "ab_neg":
//         const ab_neg_doner= await Blood.find({$and:  [{bg:"ab_neg"},{city:gcity}]})
//         donerlist=ab_neg_doner;
//         break;
//     default:
        
//             // const z_neg_doner= await Blood.find({ bg:a_neg})
//             // donerlist=z_neg_doner;
//             break;
        
// }


// donerlist.forEach(donerdata=>
//   {
//   var gnumber=donerdata.number

  
//   const accountSid = 'AC5e289c8926743ec2f28fc3b41fd5d01b'; 
//   const authToken = '4f16b76fdd1d3611d7723c718c702d90'; 
//   const client = require('twilio')(accountSid, authToken); 

//       client.messages
//           .create({
//               body: 'Help !! Urgent need of blood with your matching blood group. Please donate blood you have chance to save a life.',
//               from: '+17722910649',
//               to: gnumber,
              
//           })
//           .then(message => console.log(message.sid));
    
      
// })

  


//   sendsms();

//   res.send("sms sent!!")

// })

// app.get("/adminreqclear",(req,res)=>{
// res.render('adminreqclear')

// })


app.get("/adminreqclear",(req,res)=>{

    Request.find({},function(err,requestdata){
        res.render('adminreqclear',{
            requestList:requestdata
        })
    })


})

app.get("/camp",(req,res)=>{
    res.render('camp')
})

app.post("/adminreqsend",(req,res)=>{


let newevent=new event({
    oname:req.body.oname,
    odate:req.body.odate,
    ostate:req.body.ostate,
    ocity:req.body.ocity,
    obloodgroup:req.body.obloodgroup,
    ovenue:req.body.ovenue,
    onumber:req.body.onumber});
    newevent.save();


const sendsms=async()=>{
   
    gcity=req.body.ocity;
    gbloodgroup=req.body.obloodgroup;
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
                    
                        const z_neg_doner= await Blood.find({ city:gcity})
                        donerlist=z_neg_doner;
                        break;
                    
            }
    
            donerlist.forEach(donerdata=>
                {
                var gnumber=donerdata.number;
              
                
    
                const accountSid = 'AC5e289c8926743ec2f28fc3b41fd5d01b'; 
                const authToken = '8e00b644e93690125de971a68bae3e6e'; 
                const client = require('twilio')(accountSid, authToken); 
              
                    client.messages
                        .create({
                            body: 'Blood Donation camp in your area. Please donate blood you have chance to save a life. For more details visit Rakt-Shodh website or nearer blood bank',
                            messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5', 
                            to: `${gnumber}`,
                            
                        })
                        .then(message => console.log(message.sid));
                  
                       
                        

//                         const accountSid = 'AC5e289c8926743ec2f28fc3b41fd5d01b'; 
//                         const authToken = '8e00b644e93690125de971a68bae3e6e'; 
//                         const client = require('twilio')(accountSid, authToken); 
 
// client.messages 
//       .create({ 
//          body: 'Blood Donation camp in your area. Please donate blood you have chance to save a life. For more details visit Rakt-Shodh website or nearer blood bank',  
//          messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5',      
//          to: `${gnumber}`
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();
//              })
             })
            }
    
                    
    sendsms();
    res.render('smssenttoall')

})

app.get("/adminupdate",(req,res)=>{
    Bank.find({},function(err,bloodbank){
        res.render('adminupdate',{
            bloodbanklist:bloodbank
        })
    })
   
})



app.post("/update",(req,res)=>{
    const update=async()=>{
    var oid=req.body.id;
    var obg=req.body.bloodgroup;
    var ostock=req.body.stock;
const filter={bid:oid};
    switch (obg) {
        case "a_pos":
            const updatea_pos={a_pos:ostock};
            await Bank.findOneAndUpdate(filter,updatea_pos);
            break;
        case "b_pos":
            const updateb_pos={b_pos:ostock};
            await Bank.findOneAndUpdate(filter,updateb_pos);
            break;
        case "o_pos":
            const updateo_pos={o_pos:ostock};
            await Bank.findOneAndUpdate(filter,updateo_pos);
            break;
        case "ab_pos":
            const updateab_pos={ab_pos:ostock};
            await Bank.findOneAndUpdate(filter,updateab_pos);
            break;
        case "a_neg":
            const updatea_neg={a_neg:ostock};
            await Bank.findOneAndUpdate(filter,updatea_neg);
            break;  
        case "b_neg":
            const updateb_neg={b_neg:ostock};
            await Bank.findOneAndUpdate(filter,updateb_neg);
            break;            
        case "o_neg":
            const updateo_neg={o_neg:ostock};
            await Bank.findOneAndUpdate(filter,updateo_neg);
            break;
        case "ab_neg":
            const updateab_neg={ab_neg:ostock};
            await Bank.findOneAndUpdate(filter,updateab_neg);
            break;         
        default:
           
            break;
    }
    }
    update();
res.send("updated...");

    

})













const port=3000;


// app.listen(3000,function(){
//     console.log("connected........");

// })

app.listen(port, hostname, () => {
    console.log(`HTTP Server listening at http://${hostname}:${port}/`);
  });