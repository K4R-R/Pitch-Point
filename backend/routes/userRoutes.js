const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const userController = require('../controllers/userController');

// login page
router.post('/login',userController.loginUser);

// signup page
router.post('/signup',userController.signupUser);

router.use(requireAuth);
router.get('/example',() => {
   console.log('example');
})

module.exports=router;