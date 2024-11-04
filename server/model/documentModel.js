
const documents = [];
const defaultValue = "";

function findOrCreateDocument(id) {
  let document = documents.find((doc) => doc.id === id);
  if (!document) {
    document = { id, data: defaultValue, lockedBy: null };
    documents.push(document);
    console.log("New document created:", id);
  }
  return document;
}

function releaseDocumentLock(socketId) {
  const document = documents.find((doc) => doc.lockedBy === socketId);
  if (document) {
    document.lockedBy = null;
    console.log(`Document ${document.id} unlocked by disconnecting socket: ${socketId}`);
    return document;
  }
  return null;
}
module.exports = { findOrCreateDocument,releaseDocumentLock };
