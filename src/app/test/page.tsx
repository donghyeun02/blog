'use client';
import { useState } from 'react';

export default function PinataUploadTest() {
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }
    setUploading(true);
    const data = new FormData();
    data.set('file', file);
    const uploadRequest = await fetch('/api/files', {
      method: 'POST',
      body: data,
    });
    const signedUrl = await uploadRequest.json();
    setUrl(signedUrl);
    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <main>
      <input type="file" onChange={handleChange} />
      <button type="button" disabled={uploading} onClick={uploadFile}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      )}
    </main>
  );
}
