//it is a node server to handle socket.io
const io=require("socket.io")(8000)

const users={};

//when connection comes run io function
//io listens all user connections
io.on('connection',socket=>{
    //when user joins,we want to run socket.io which is http instance,server will listen incoming events
    //socket for a particular connection
    socket.on('new-user-joined',name=>{
        //when user want to join chat we assign name to the id
        //console.log("New user",name);
        
         users[socket.id]=name;
         //to broadcast all that one user joined
         socket.broadcast.emit('user-joined',name);
        
    });

    socket.on('send',message=>{
        socket.broadcast.emit('received',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',name=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});