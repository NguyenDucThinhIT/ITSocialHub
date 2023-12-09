import React, { useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'; 

const RichTextEditor = ({ value, handleChange, placeholder, className }) => {
  const [editorValue, setEditorValue] = useState(value || '');

  const handleEditorChange = (val) => {
    handleChange(val);
    setEditorValue(val);
  };

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  return (
    <div className="rich-text-editor-container bio-text">
      <ReactQuill
        value={editorValue}
        className={className}
        onChange={handleEditorChange}
        placeholder={placeholder}
        modules={{
            toolbar: [
                [{ 'header': [1, 2, false] }],
                [{ 'size': ['small', 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                ['link', 'image'],
                ['clean'],
              ],
        }}
        formats={[
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet',
            'link', 'image',
            'size',
          ]}
      />
    </div>
  );
};

export default RichTextEditor;
