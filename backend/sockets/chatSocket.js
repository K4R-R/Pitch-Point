const chatSocket = (io) => {

   io.on("connection",async (socket) => {
      console.log("user connected:",socket.id);
   
      socket.on("disconnect",async() => {
   
         console.log("user disconnected:",socket.id);

      });

      socket.on('newMessage', (message) => {
         console.log('New message:', message);
         socket.broadcast.emit('messageReceived', message);
     });
   
      // socket.on("chatDeleted",(deleteId) => {
      //    socket.broadcast.emit("deletedMessage",deleteId);
      // });
   
   });
}

module.exports = chatSocket;