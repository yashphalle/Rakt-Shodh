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
require('dotenv').config();



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

const Event=mongoose.model('eventdata',eventdataSchema);
app.get('/',function(req,res){
res.render('index')
})


const requestdataSchema={
    rname:String,
    rstate:String,
    rcity:String,
    rbg:String,
    rnumber:String,
    raccstatus:String,
    raccby:String,
    rappoinmentdate:String,
    rappoinmentbloodbank:String,
    rdonationstatus:String,
    rappoinmenttime:String,
    bid:Number

    
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

//MAIN REQ BLOOD FUNCTION
app.post("/request",(req,res)=>{


    let newrequest=new Request({
        rname:req.body.rname,       
        rstate:req.body.rstate,
        rcity:req.body.rcity,
        rbg:req.body.rbloodgroup,
        rnumber:"+91"+req.body.rnumber
    });
        newrequest.save();

const sendsmstorequestor=async()=>{
            rnumber="+91"+req.body.rnumber;
            rname=req.body.rname;
            var result= await Request.findOne({rname:rname},{rnumber:rnumber});
            // trackid=result.name;
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;

           
           const client = require('twilio')(accountSid, authToken);
       
        // Make API calls here...
          
                client.messages
                    .create({
                        body: `Your Request Has Been Sent To All ! Please check Track request option for tracking progress of your request .Tracking Id:${result._id}`,
                        messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5', 
                        to: `${rnumber}`,
                        
                    })
                    .then(message => console.log(message.sid));
                   


        }




const sendsms=async()=>{
        rnumber="+91"+req.body.rnumber;
        rname=req.body.rname;

        var result= await Request.findOne({$and:[{rname:rname},{rnumber:rnumber}]});
        
        // var gstate=result.rstate;
        var gcity=result.rcity;
        var gbloodgroup=result.rbg;
        console.log("result=");
        console.log(result);

var donerlist;

// console.log(gbloodgroup);
// PROBLEM IN GBLOODGROUP-----------
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
        console.log(donerlist);
        donerlist.forEach(donerdata=>
            {
            var number=donerdata.number;
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
           const authToken = process.env.TWILIO_AUTH_TOKEN;
           
           const client = require('twilio')(accountSid, authToken);
        
        // Make API calls here...
          
                client.messages
                    .create({
                        body: `Help !! Urgent need of blood with your matching blood group. Please donate blood you have chance to save a life.For donation visit Rakt-Shodh Website-and click on accept request function and enter Request ID.REQUEST ID: ${result._id}`,
                        messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5', 
                        to: `${number}`,
                        
                    })
                    .then(message => console.log(message.sid));
              
                    
         })
        
        }

sendsms();
sendsmstorequestor();
res.render('smsnotification')
        
})

app.get("/adminreqclear",(req,res)=>{

    Request.find({},function(err,requestdata){
        res.render('adminreqclear',{
            requestList:requestdata
        })
    })


})

app.post("/adminreqsend",(req,res)=>{


    let newevent=new Event({
        oname:req.body.oname,       
        ostate:req.body.ostate,
        odate:req.body.odate,
        ocity:req.body.ocity,
        obg:req.body.obloodgroup,
        ovenue:req.body.ovenue,
        onumber:"+91"+req.body.onumber,
    });
        newevent.save();
        res.render("index")
})
app.get("/camp",(req,res)=>{
    res.render('camp')
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
    Bank.find({},function(err,bloodbank){
        res.render('adminupdate',{
            bloodbanklist:bloodbank
        })
    })

    

})





app.get("/acceptrequest",(req,res)=>{
    res.render('acceptrequest')
})
app.post("/acceptrequest",(req,res)=>{
    var id=req.body.requestid;


const update=async()=>{
var id=req.body.requestid;

var raccstatus="accepted";
var name=req.body.raccby;
var rappoinmentdate=String(req.body.date);
var bloodbank=req.body.bloodbank;
var rdonationstatus="inprogress";
var  rappoinmenttime=String(req.body.time);
var bid=req.body.bid;

// const update_status={raccstatus:raccstatus};
// const update_doner={raccby:name};
// const update_date={rappoinmentdate:rappoinmentdate};
// const update_bloodbank={rappoinmentbloodbank:rappoinmentbloodbank };
// const update_donation_status={rdonationstatus:rdonationstatus };
const update={raccstatus:raccstatus,raccby:name,rappoinmentdate:rappoinmentdate,rappoinmentbloodbank:bloodbank,rdonationstatus:rdonationstatus,rappoinmenttime:rappoinmenttime,bid:bid}
// await Request.findByIdAndUpdate({_id:id},{update_doner,update_status,update_date,update_bloodbank,update_donation_status});
await Request.findByIdAndUpdate(id,update);



    }

const sms=async()=>{
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    var sms=await Request.findById(id);
    const rnumber=`${sms.rnumber}`;
    
    const client = require('twilio')(accountSid, authToken);
        //    document.write(accountSid);
// Make API calls here...
          
                client.messages
                    .create({
                        body: `Your Request Has Been Accepted ! Please check Track request option for tracking progress of your request .Tracking Id:${sms._id} Tentative Date: ${sms.rappoinmentdate} Tentative Time:${sms.rappoinmenttime}`,
                        messagingServiceSid: 'MGa6a2aba55a2b53e61274df047248bfc5', 
                        to: `${rnumber}`,
                        
                    })
                    .then(message => console.log(message.sid));
                   
}

update();
sms();

// res.render("index");
res.render('index')
})


app.get("/trackrequest",(req,res)=>{
    res.render('trackrequest')
})
app.post("/trackrequest",(req,res)=>{
    var id=req.body.rid;
    
    requestlist=[];
   Request.find({_id:id},function(err,requestdata){
   res.render('trackrequestresult',{
       requestlist:requestdata
   })
})
 
       
  
        
})

app.get("/updatereqstatus",(req,res)=>{
    
   
    Request.find({},function(err,requestdata){

        console.log(progress);
        res.render('updatereqstatus',{
            requestlist:requestdata,progress:progress} 
        )
    })

})

app.get("/bloodbankdashboard",(req,res)=>{
    res.render('bloodbankdashboard')
})


const port= process.env.port||3000;


app.listen(port, () => {
    console.log(`HTTP Server listening at http://${hostname}:${port}/`);
  });
