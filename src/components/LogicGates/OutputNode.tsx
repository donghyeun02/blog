import React from 'react';
import { Handle, Position } from 'reactflow';

export default function OutputNode({ data }: { data: { value: number } }) {
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
        <Handle
          type="target"
          position={Position.Left}
          id="in"
          style={{
            background: '#fff',
            border: '2px solid #aaa',
            width: 16,
            height: 16,
            borderRadius: '50%',
            boxShadow: 'none',
          }}
        />
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: data.value ? '#22c55e' : '#f43f5e',
            marginRight: 0,
            marginLeft: 11,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            border: '2px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
          }}
        >
          {data.value}
        </div>
      </div>
    </>
  );
}
