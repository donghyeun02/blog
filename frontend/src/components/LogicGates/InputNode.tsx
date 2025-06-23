import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export default function InputNode({
  data,
}: {
  data: { value: number; onChange: (v: number) => void };
}) {
  const [value, setValue] = useState(data.value ?? 0);
  const toggle = () => {
    const v = value === 1 ? 0 : 1;
    setValue(v);
    data.onChange && data.onChange(v);
  };
  return (
    <>
      <style>{`
        .custom-node {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
          padding: 0 !important;
        }
      `}</style>
      <div
        className="custom-node"
        style={{ display: 'inline-flex', alignItems: 'center', padding: 0 }}
      >
        <button
          onClick={toggle}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: value ? '#22c55e' : '#f43f5e',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            border: '2px solid #fff',
            cursor: 'pointer',
            marginRight: 11,
            outline: 'none',
            boxShadow: 'none',
          }}
        >
          {value}
        </button>
        <Handle
          type="source"
          position={Position.Right}
          id="out"
          style={{
            background: '#fff',
            border: '2px solid #aaa',
            width: 16,
            height: 16,
            borderRadius: '50%',
            marginLeft: 0,
            marginRight: 0,
            boxShadow: 'none',
          }}
        />
      </div>
    </>
  );
}
