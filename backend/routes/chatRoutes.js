const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const chatController = require('../controllers/chatController');

router.use(requireAuth);

//uploading blogs
router.post('/add',chatController.addChat);

//getting all blogs
router.get('/:senderEmail',chatController.getUserChat);


module.exports=router;