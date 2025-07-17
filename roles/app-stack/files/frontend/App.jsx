import React, { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">courses </h1>
      <ul className="list-disc pl-5 mb-4">
        {courses.map((course) => (
          <li key={course.id} className="mb-2">
            {course.name} (ID: {course.id})
          </li>
        ))}
      </ul>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
       uploading 
      </button>
    </div>
  );
}

export default App;