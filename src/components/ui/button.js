// src/components/ui/button.js
import React from 'react';

export function Button({ children, onClick, variant = 'default' }) {
  const style = {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    backgroundColor: variant === 'outline' ? '#fff' : '#007bff',
    color: variant === 'outline' ? '#007bff' : '#fff',
    border: variant === 'outline' ? '1px solid #007bff' : 'none',
  };

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}