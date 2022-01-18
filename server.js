const mongoose=require('mongoose');
const express=require('express');
const ejs=require('ejs');
const app=express();
app.set('view engine','ejs');


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




app.listen(3000,function(){
    console.log("connected........");

})