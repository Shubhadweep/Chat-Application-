
const socket = io();

let name;
let textarea = document.querySelector('textarea');
let smsArea = document.querySelector('.sms_area');
do {
  name = prompt('Enter your Name');
} while (!name);

textarea.addEventListener('keyup',(e)=>{
  if (e.key === 'Enter'){
    sendMessage(e.target.value);
  }
})

function sendMessage(Message){
  let sms = {
    user: name,
    message: Message.trim()
  }
  //Append

   appendMessage(sms,'outgoing');
   textarea.value = '';
   Scroll();

  // Send message to the Server
  socket.emit('message',sms);
}

function appendMessage(sms,type){
  let mainDiv = document.createElement('div');
  let className =type;

  mainDiv.classList.add('className', 'message');

  let markup = `
     <h4>${sms.user}</h4>
     <p>${sms.message}</p>

  `
  mainDiv.innerHTML = markup;
  smsArea.appendChild(mainDiv);
}

// Receiving the Messages

socket.on('message',(sms)=>{
  appendMessage(sms,'incoming');
  Scroll();
})

// For Automatic scroling of the Text Messages
function Scroll(){
  smsArea.scrollTop = smsArea.scrollHeight;
}