const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;
const MONGODB_URI = "mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => {
    //Inicia o servidor
    http.createServer(app)
      .listen(port, () => {
        console.log(`Server up on http://${host}:${port}`);
      })
  })
  .catch();

  req.session.destroy()
	req.session.save(()=>{});
