
const { findOrCreateDocument ,releaseDocumentLock} = require("../model/documentModel");

function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected with ID:", socket.id);

    socket.on("get-document", (documentId) => handleGetDocument(socket, documentId));
    socket.on("lock-document", (documentId) => handleLockDocument(socket, io, documentId));
    socket.on("unlock-document", (documentId) => handleUnlockDocument(socket, io, documentId));
    socket.on("send-changes", (documentId, newContent) => handleSendChanges(socket, io, documentId, newContent));

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
      
      const unlockedDocument = releaseDocumentLock(socket.id);
    if (unlockedDocument) {
      io.to(unlockedDocument.id).emit("lock-status", { locked: false });
    }
    


    });
  });
}

function handleGetDocument(socket, documentId) {
  console.log("get-document:", documentId);
  const document = findOrCreateDocument(documentId);
  
  socket.join(documentId);
  socket.emit("load-document", {
    locked: document.lockedBy,
    owner: socket.id,
    newContent: document.data
  });
  socket.emit("lock-status", { locked: document.lockedBy, owner: socket.id });
}

function handleSendChanges(socket, io, documentId, newContent) {
  const document = findOrCreateDocument(documentId);
  document.data = newContent;

  const data = {
    locked: document.lockedBy,
    owner: socket.id,
    newContent: newContent
  };

  socket.broadcast.to(documentId).emit("receive-changes", data);
  console.log(`changes to all document ${documentId}`, newContent);
}

function handleLockDocument(socket, io, documentId) {
  const document = findOrCreateDocument(documentId);
  if (!document.lockedBy) {
    document.lockedBy = socket.id;
    io.to(documentId).emit("lock-status", { locked: document.lockedBy, owner: socket.id });
    console.log("Document locked by:", socket.id);
  } else {
    io.to(documentId).emit("lock-status", { locked: document.lockedBy });
    
  }
}

function handleUnlockDocument(socket, io, documentId) {
  const document = findOrCreateDocument(documentId);
  if (document && document.lockedBy === socket.id) {
    document.lockedBy = null;
    io.to(documentId).emit("lock-status", { locked: false });
    console.log("Document unlocked by:", socket.id);
  } else {
    console.log("Unlock attempt failed. Document may not be locked by this socket.");
  }
}

module.exports = { setupSocketHandlers };
