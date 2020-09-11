import express from 'express';
import userRouter from './user.router';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.use('/users', userRouter);

export default app;