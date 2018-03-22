// server.js
const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require ('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast function to send data to all connected users
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // Creates object on login and sends to client specifying how many users are logged in right now
  let loginObj = {
    type: 'incomingLogin',
    userCount: wss.clients.size
  }
  ws.send(JSON.stringify(loginObj));
  // Parse incoming message that has been stringified
  ws.on('message', function incoming(message) {
    console.log('received: ', JSON.parse(message));
    let incomingMsg = JSON.parse(message);
    // if the type is a message, send back object in message format
    if(incomingMsg.type === 'postMessage') {
      let msgObj = {
        type: 'incomingMessage',
        id: uuidv4(),
        username: incomingMsg.username,
        content: incomingMsg.content,
        color: incomingMsg.color
      }
      // Send to each client that is online
      wss.broadcast(JSON.stringify(msgObj));
    // if type is notification or logout, send back object in notification format
    } else if (incomingMsg.type === 'postNotification' || incomingMsg.type === 'postLogout') {
      let notificationObj = {
        type: 'incomingNotification',
        id: uuidv4(),
        content: incomingMsg.content
      }
      // Send to each client that is online
      wss.broadcast(JSON.stringify(notificationObj));
      // if type is postLogin, do similar to the above case but add userCount
    } else if (incomingMsg.type === 'postLogin') {
      let notificationObj = {
        type: 'incomingNotification',
        id: uuidv4(),
        content: incomingMsg.content,
        userCount: wss.clients.size
      }
      wss.broadcast(JSON.stringify(notificationObj));
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    // Creates object on logout and sends to client specifying how many users are logged in right now
    let logoutObj = {
      type: 'incomingLogout',
      userCount: wss.clients.size
    }
    wss.broadcast(JSON.stringify(logoutObj));
  });
});

