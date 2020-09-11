import express from 'express';
import usersRouter from './users/users.router';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.use('/users', usersRouter);

export default app;