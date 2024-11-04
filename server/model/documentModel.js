
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

module.exports = { findOrCreateDocument };
