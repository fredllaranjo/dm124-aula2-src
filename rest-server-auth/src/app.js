const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = "mongodb+srv://dm124-admin:KVVjuqYoAWZyVa7y@clusterdm124.o0qmk.mongodb.net/questionsDatabase"; // As opções da URI não são aplicáveis: ?retryWrites=true&w=majority
const csrf = require('csurf');
const csrfProtection = csrf();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
// Middlewares
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const notFound = require('./middleware/not-found');
app.use(session({secret: 'no one will know', resave: false, saveUninitialized: false, store: store}));

app.use(csrfProtection); //Após a criação da session
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const questionsRouter = require('./routes/questions');
app.use('/api/questions', questionsRouter);

// Missing routes
app.use(notFound);

module.exports = app;