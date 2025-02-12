// Firebase and Socket.io setup
const socket = io();

// DOM Elements
const groupList = document.getElementById('group-list');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');

// Fetch study groups
fetch('/api/groups')
  .then((response) => response.json())
  .then((groups) => {
    groups.forEach((group) => {
      const li = document.createElement('li');
      li.textContent = group.name;
      groupList.appendChild(li);
    });
  });

// Send chat message
sendMessageBtn.addEventListener('click', () => {
  const message = chatInput.value;
  if (message) {
    socket.emit('chat-message', message);
    chatInput.value = '';
  }
});

// Receive chat messages
socket.on('chat-message', (message) => {
  const p = document.createElement('p');
  p.textContent = message;
  chatWindow.appendChild(p);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});