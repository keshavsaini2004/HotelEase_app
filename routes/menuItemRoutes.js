const express = require('express');
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

// parameteres for menu card

router.post("/",async(req,res) =>{
    try{
  const data = req.body;
  const newMenuItem = new MenuItem(data);
  const response = await newMenuItem.save();
  
  console.log("Data saved successfully");
  res.status(200).json({
    status: 200,
    message: "Data saved successfully",
    data: response
    });
  }
    catch(err){
     console.error("Error saving data",err);
     res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: err.message
    })
  }
  });
  
  router.get("/",async(req,res) =>{
  
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  });

  router.get('/:tastetype', async(req,res)=>{
    try{
      const tastetype =req.params.tastetype;
      if( tastetype == 'sour'|| tastetype == 'sweet'|| tastetype== 'spicy' ){
        const response = await MenuItem.find({taste:tastetype});
        console.log('data fetched');
        res.status(200).json(response);   
      }else{
        res.status(404),json({error:'Invalid work type'});
      }
      
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  });
  router.put('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id; // Extract the id from the URL parameter
      const updatedMenuData= req.body;

      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData ,{
        new: true, // Return the updated document
        runValidators:true,//Run mongoose validation

      })
      if (!response) {
        return res.status(404).json({ error: 'MenuItem not found' });
      }
      console.log('data updated');
        res.status(200).json(response); 

    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
   
    }
  })
  router.delete("/:id",async(req,res)=>{
    try{
      const menuId= req.params.id;//Extact the person's Id from the URL parameters 
      //Assuming  you have a person model
      const response = await MenuItem.findByIdAndDelete(menuId);
      if (!response) {
        return res.status(404).json({ error: 'menu not found' });
      }
      console.log('data deleted');
        res.status(200).json({message:'menu data deleted successfullly'}); 


    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
   
    }
  })
  module.exports = router;
