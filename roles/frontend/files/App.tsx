import React, { useState } from 'react';
import { useGetCoursesQuery, useUploadFileMutation } from './api/apiSlice';

function App() {
  const { data, error, isLoading } = useGetCoursesQuery();
  const [uploadFile] = useUploadFileMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadFile(formData).unwrap();
      alert(result.message);
    } catch (err) {
      alert('Error in loading files');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Courses
      </h1>

      {isLoading && <p>Loading ....</p>}
      {error && <p className="text-red-500">Error in getting data</p>}

      <ul className="list-disc pl-5 mb-4">
        {data?.courses?.map((course) => (
          <li key={course.id} className="mb-2">
            {course.name} (ID: {course.id})
          </li>
        ))}
      </ul>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        آپلود فایل
      </button>
    </div>
  );
}

export default App;
