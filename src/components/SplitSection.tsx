import React from 'react';

export default function SplitSection({
  left,
  right,
  direction = 'row',
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  direction?: 'row' | 'col';
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'row' ? 'row' : 'column',
        gap: '3rem',
        margin: '3rem 0',
        alignItems: direction === 'row' ? 'flex-start' : 'stretch',
        minHeight: direction === 'col' ? 'auto' : '400px',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        {left}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {right}
      </div>
    </div>
  );
}
