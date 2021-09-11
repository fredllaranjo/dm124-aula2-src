const http = require('http');
const app = require('./app');
const mongoConnect = require('./database/QuestionsMongoDB').mongoConnect;
const Question = require('./models/question');
const Option = require('./models/option');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

mongoConnect(() => {
  //Inicia o servidor
  http.createServer(app)
    .listen(port, () => {
      console.log(`Server up on http://${host}:${port}`);
    })
});


