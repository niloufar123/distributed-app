const express = require('express');
const Minio = require('minio');
const mysql = require('mysql2/promise');
const multer = require('multer');

const upload = multer();
const app = express();

const minioClient = new Minio.Client({
  endPoint: '192.168.56.12',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minIOAdmin@123',
});
const bucketName = 'courses-materials';

const db = mysql.createPool({
  host: '192.168.56.11',
  user: 'nodeuser',
  password: '123456123456@Nil',
  database: 'coursedb',
});

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileId = `file_${Date.now()}`;
  await minioClient.putObject(bucketName, `${fileId}/${req.file.originalname}`, req.file.buffer);
  res.json({ message: 'File uploaded', fileId });
});

app.get('/courses', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courses');
    res.json({ courses: rows });
  } catch (err) {
    console.error('MySQL Error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/init', async (req, res) => {
  try {
    await db.query(
      'INSERT INTO courses (name, description) VALUES (?, ?), (?, ?)',
      [
        'Introduction to Python', 'A beginner course on Python programming',
        'Web Development Basics', 'Learn HTML, CSS, and JavaScript'
      ]
    );
    res.json({ message: 'Courses initialized' });
  } catch (err) {
    console.error('Init Error:', err);
    res.status(500).json({ error: 'Initialization error' });
  }
});

(async () => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName);
    }
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (err) {
    console.error('MinIO Init Error:', err);
  }
})();
