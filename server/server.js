const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1); // Chatgpt i need this fro deploying to render


const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const animalRouter = require('./routes/animal.router');
const jobRouter = require('./routes/job.router');
const activeJobRouter = require('./routes/activeJob.router');
const contactRouter = require('./routes/contact.router');
const auditionRouter = require('./routes/audition.router');
const imagesRouter = require('./routes/images.router');
const csvRouter = require('./routes/csv.router');
const animalTypesRouter = require('./routes/animalTypes.router');


// CORS <- needed for render deployment
app.use(cors({
  origin: process.env.API_URL, // your deployed frontend
  credentials: true, // important for cookies/auth headers
}));
app.options('*', cors({
  origin:  process.env.API_URL,
  credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
  console.log('Cookies:', req.headers.cookie);
  next();
});
/* Routes */
app.use('/api/user', userRouter);
app.use('/api/animal', animalRouter);
app.use('/api/job', jobRouter);
app.use('/api/activejob', activeJobRouter);
app.use('/api/contact', contactRouter);
app.use('/api/audition', auditionRouter);
app.use('/api/images', imagesRouter);
app.use('/api/csv', csvRouter);
app.use('/api/types', animalTypesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 8000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
