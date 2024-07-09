const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const connectionController = require('../controllers/connectionController');

router.use(requireAuth);

//uploading business model
router.post('/',connectionController.addConnection);

//getting business values
router.get('/',connectionController.getAllConnections);

//updating status
router.post('/update',connectionController.changeStatus);

module.exports=router;