const express=require('express');
const router =express.Router();
var Contact =require('../Models/contact.js')
router.get('/',(req,res,next)=>{
res.json({
    message: 'hello'});
});
router.post('/',(req,res,next)=>{
var contact=new Contact({fullName: req.body.contactName ,phone:req.body.contactphone})
contact.save((err,newContact)=>{
    if(err){
        console.log(`there is an erro ${err}`)
    }else{
        res.json(newContact);
    }
})
})

router.get('/contacts',async (req,res)=>{
 try{
   await Contact.find({}).then((result)=>{
        res.send(result);
    });
 }catch(err){
    console.log(err);
 }

}) ;
router.delete("/delete/:id",async (req,res)=>{
    try{
        await Contact.findOneAndDelete({ id : req.params.id});
        res.send("supprimé avec succes !");
    }catch(err){
        res.send(err);
    }
});
router.put("/update/:id",async (req,res)=>{
    try{
        await Contact.findOneAndUpdate({ _id : req.params.id},{
            fullName: req.body.contactName ,phone:req.body.contactphone
 });
        res.send("mise ajour  avec succes !");
    }catch(err){
        res.send(err);
    }
});
router.get("/find/:id",async (req,res)=>{
    try{
        await Contact.findOne({id : req.params.id}).then((result)=>{
             res.send(result);
         });
      }catch(err){
         console.log(err);
      }
});
module.exports=router;