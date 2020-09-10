import express from 'express';
const app = express();
const SERVER_PORT = 8000;

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
})