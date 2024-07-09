const Connections = require('../models/connectionModel');

const addConnection = async (req,res) => {

   const {founderEmail,founderName,investorEmail} = req.body;
   const investorName = req.user.name;
   const status = 'Pending';

   if( !founderEmail || !investorEmail ) {
      res.status(400).json({error:'Founder and Investor Emails Not Provided'});
   }

   try {
      const connection = await Connections.create({founderEmail,founderName,investorEmail,investorName,status});

      res.status(200).json(connection);
   } catch (err) {
      res.status(400).json({error:err.message});
   }

}

const getAllConnections = async (req,res) => {

   try {
      const connections = await Connections.find();

      res.status(200).json(connections);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

const changeStatus = async (req,res) => {
   const {status,_id} = req.body;

   try {
      const connection = await Connections.findOne({_id});

      connection.status = status;

      const updatedConnection = await connection.save();

      const allConnections = await Connections.find();

      res.status(200).json(allConnections);
   } catch (err) {
      res.status(400).json({error:err.message});
   }
}

module.exports = {
   addConnection,getAllConnections,changeStatus
}