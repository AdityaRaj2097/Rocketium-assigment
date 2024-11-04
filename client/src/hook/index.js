
import { useEffect, useState, useRef } from 'react';
import socket, {
  getDocument,
  lockDocument,
  unlockDocument,
  sendChanges,
  subscribeToEvent,
  unsubscribeFromEvent,
} from '../Service/shocketService';

export const useDocumentEditor = (documentId) => {
  const [content, setContent] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!documentId) return;

    getDocument(documentId);

    const handleLoadDocument = ({ locked, newContent }) => {
      if (locked && locked !== socket.id) {
        setIsLocked(true);
      }
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        quill.clipboard.dangerouslyPasteHTML(newContent);
      }
    };

    const handleLockStatus = ({ locked }) => {
      if (locked === socket.id) {
        setIsLocked(false);
      } else {
        setIsLocked(!!locked);
      }
    };
    

    const handleReceiveChanges = ({ locked, newContent }) => {
      if (locked && locked !== socket.id && quillRef.current) {
        const quill = quillRef.current.getEditor();
        quill.clipboard.dangerouslyPasteHTML(newContent);
      }
    };

    subscribeToEvent('load-document', handleLoadDocument);
    subscribeToEvent('lock-status', handleLockStatus);
    subscribeToEvent('receive-changes', handleReceiveChanges);

    return () => {
      unsubscribeFromEvent('load-document');
      unsubscribeFromEvent('lock-status');
      unsubscribeFromEvent('receive-changes');
    };
  }, [documentId]);

  const handleFocus = () => {
    if (!isLocked) lockDocument(documentId);
  };

  const handleBlur = () => {
    if (isLocked) unlockDocument(documentId);
  };

  const handleChange = (newContent) => {
   
    setContent(newContent);
    sendChanges(documentId, newContent);
  };

  return { content, setContent, isLocked, handleFocus, handleBlur, handleChange, quillRef };
};
