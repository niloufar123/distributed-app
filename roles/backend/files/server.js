const http = require('http');

const courses = [
  { id: 1, title: 'Node.js Basics' },
  { id: 2, title: 'Advanced React' },
  { id: 3, title: 'DevOps with Docker' },
];

const server = http.createServer((req, res) => {
  if (req.url === '/courses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(courses));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}/`);
});

