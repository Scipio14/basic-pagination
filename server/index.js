const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const Post = require('./models/Post');

mongoose.connect('mongodb://localhost/pagination', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(()=>{
  console.log("MongoDB connected");
}).catch(err=> console.log(err));


const app = express();

app.use(cors());
app.use(express.json());

app.get('/posts',async (req,res)=>{
  //creating the page query variable
  const page = parseInt(req.query.page || 1);
  //creating the page size query variable
  const PAGE_SIZE = 3;
  //We need to tell the user the total number of pages there are
  const total = await Post.countDocuments({});
  const totalPages = Math.ceil(total/PAGE_SIZE);

  const posts = await Post.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));
    res.json({
      totalPages,
      posts
    });
})

app.listen(4000,()=>{
  console.log('Server is running on port 4000');
});
