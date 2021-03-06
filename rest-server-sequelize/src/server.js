const http = require('http');
const app = require('./app');
const sequelize = require('./database/QuestionsSequelize');
const Question = require('./models/question');
const Option = require('./models/option');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

Option.belongsTo(Question, {constraints: true, onDelete: 'CASCADE'});
Question.hasMany(Option);
sequelize
  .sync() //Creates IF NOT EXISTS
  .then(
    http.createServer(app)
      .listen(port, () => {
        console.log(`Server up on http://${host}:${port}`);
      })
  )
  .catch()
