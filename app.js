require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
// const userRouter = require('./Services/Users/userRoutes');
const billsRouter = require('./Services/Bills/billsRoutes');
// const journalRouter = require('./Services/JournalServices/routes');

const app = express();
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

// Middleware:
app.use(cors());
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());

// Routers:
app.use('/api/bills', billsRouter);
// app.use('/api/users', userRouter);
// app.use('/api/journal', journalRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});




module.exports = app;