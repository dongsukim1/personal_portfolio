// src/components/ui/card.js
import React from 'react';

export function Card({ children }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '16px',
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    }}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}