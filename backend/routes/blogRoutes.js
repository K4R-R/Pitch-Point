const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const blogController = require('../controllers/blogController');

router.use(requireAuth);

//uploading blogs
router.post('/add',blogController.addBlog);

//getting all blogs
router.get('/',blogController.getBlogs);

//getting single blog
router.get('/:id',blogController.getSingleBlog);

//updating blog
router.put('/:id',blogController.updateBlog);

//deleting a blog
router.delete('/:id',blogController.deleteBlog);

module.exports=router;