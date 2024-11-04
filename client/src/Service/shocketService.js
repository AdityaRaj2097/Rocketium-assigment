
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001'; 
const socket = io(SOCKET_URL);

export const getDocument = (documentId) => {
  socket.emit('get-document', documentId);
};

export const lockDocument = (documentId) => {
  socket.emit('lock-document', documentId);
};

export const unlockDocument = (documentId) => {
  socket.emit('unlock-document', documentId);
};

export const sendChanges = (documentId, newContent) => {
  socket.emit('send-changes', documentId, newContent);
};


export const subscribeToEvent = (event, callback) => {
  socket.on(event, callback);
};


export const unsubscribeFromEvent = (event) => {
  socket.off(event);
};

export default socket;
