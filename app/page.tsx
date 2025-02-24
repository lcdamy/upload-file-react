"use client";
import React from 'react';
import { useState } from 'react'



export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    const res = await fetch('http://localhost:3000/api/v1/settings/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <>

      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Upload File to MinIO</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input type="file" onChange={handleFileChange} className="mb-4" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
        </form>
      </div>

    </>
  );
}
