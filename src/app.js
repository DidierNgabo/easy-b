import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/index';

dotenv.config();

const app = express();
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to mongoDb');
  })
  .catch((error) => {
    console.log('Unabled to connect to mongodb');
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);
app.use((req, res) => {
  res.json({ message: 'Your request was successful!' });
});

module.exports = app;
