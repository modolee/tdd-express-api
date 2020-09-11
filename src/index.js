import app from './app';
const SERVER_PORT = 8000;

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});