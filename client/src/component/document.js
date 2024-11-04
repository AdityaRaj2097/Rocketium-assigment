
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/style.css'; 
import { useParams } from 'react-router-dom';
import { useDocumentEditor } from '../hook/index';

const DocumentEditor = () => {
  const { id: documentId } = useParams();
  const { content, isLocked, handleFocus, handleBlur, handleChange, quillRef } = useDocumentEditor(documentId);

  return (
    <div className="container">
      <ReactQuill
        ref={quillRef}
        value={content}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        readOnly={isLocked}
        theme="snow"
      />
    </div>
  );
};

export default DocumentEditor;
