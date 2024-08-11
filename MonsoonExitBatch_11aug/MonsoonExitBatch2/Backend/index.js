const express = require("express");
const cors = require("cors");
const mongoose = require("./connection"); 
const Post = require("./model"); 
const { model } = require("mongoose");

const app = express();
let PORT = 3001; 

app.use(express.json());
app.use(cors());

// POST 
app.post("/add", async (req, res) => {
  try {
    const { EmpName, designation,empId, img_url } = req.body;

    
    const newPost = new Post({
      EmpName,
      designation,
      empId,
      img_url,
    });

    
    await newPost.save();

    res.status(201).send({ message: "Post entry added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding post entry" });
  }
});

// GET 
app.get("/get", async (req, res) => {
  try {
    let data = await Post.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving post entries" });
  }
});

// DELETE

app.delete('/del/:id',async (req,res)=>{
  try {
      await Post.findByIdAndDelete(req.params.id);
  res.send('Deleted Successfully');
  } catch (error) {
      console.log(error)
  }
})

//update
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { EmpName, designation,empId, img_url } = req.body;

    
    const updatedPost = await Post.findByIdAndUpdate(id, { EmpName, designation,empId, img_url }, { new: true });

    if (!updatedPost) {
      return res.status(404).send({ message: "Post entry not found" });
    }

    res.send({ message: "Post entry updated successfully", updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating post entry" });
  }
});

app.listen(3001,()=>{
  console.log('The server is running on Port 3001')
})
