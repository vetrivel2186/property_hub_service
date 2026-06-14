import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// TypeScript automatically knows 'req' and 'res' are Request and Response objects
app.get('/', (req, res) => {
  res.send('🏠 Property Hub Service is Online!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is flying at http://localhost:${PORT}`);
});