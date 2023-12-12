const socket= io('http://localhost:8000');

//let name = prompt("Enter your name:");
const nameInput=document.getElementById('user-name');
const nameInp=document.getElementById('username');
const form=document.getElementById('send-msg');
const messageInput=document.getElementById('msgInp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('livechat-129007.mp3')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})

nameInput.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=nameInp.value;
    socket.emit('new-user-joined', name);
    
})

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}


socket.on('user-joined',name=>{
    
    append(`${name} joined the chat`,'left');
    
});

socket.on('received',data=>{
    append(`${data.name}:${data.message}`,'left');
});

socket.on('left',name=>{
    
    append(`${name} left the chat`,'left');
    
});
