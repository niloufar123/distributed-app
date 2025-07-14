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
  password: '123456',
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
  const courses = await db.collection('courses').find({}).toArray();
    res.json({ courses });
});
app.get('/init', async (req, res) => {
  await db.collection('courses').insertMany([
    { name: 'Introduction to Python', description: 'A beginner course on Python programming' },
    { name: 'Web Development Basics', description: 'Learn HTML, CSS, and JavaScript' },
  ]);
  res.json({ message: 'Courses initialized' });
});
(async () => {
  if (!await minioClient.bucketExists(bucketName)) {
    await minioClient.makeBucket(bucketName);
  }
  app.listen(3000, () => console.log('Server running on port 3000'));
})();
process.on('exit', () => client.close());