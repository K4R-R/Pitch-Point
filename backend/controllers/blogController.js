const Blogs = require('../models/blogModel');

const addBlog = async (req,res) => {
   const {title,author,content} = req.body;
   const userId = req.user._id;

   if(!title || !content) {
      throw Error('All fields must be filled');
   }

   try {
      const blog = await Blogs.create({userId,title,author,content});

      res.status(200).json(blog);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

const getBlogs = async (req,res) => {
   try {
      const blogs = await Blogs.find().sort({"createdAt": -1});

      res.status(200).json(blogs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

const getSingleBlog = async (req,res) => {
   const { id } = req.params;

   try {
      const blog = await Blogs.findById(id);
      
      res.status(200).json(blog);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

const updateBlog = async (req,res) => {
   const { id } = req.params;
   const { title, content, author } = req.body;
   
   try {
      const blog = await Blogs.findByIdAndUpdate(id, { title, content, author }, { new: true });
      
      res.status(200).json(blog);
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}

const deleteBlog = async (req,res) => {
   const { id } = req.params;

   try {
      const blog = await Blogs.findByIdAndDelete(id);
      
      res.status(200).json({ message: 'Blog deleted successfully' });
   } catch (err) {
      res.status(400).json({ error: err.message });
   }
}

module.exports = {
   addBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog
}