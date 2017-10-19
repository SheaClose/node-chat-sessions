const express = require('express');
const bodyParser = require('body-parser');
const mc = require(`${__dirname}/controllers/messages_controller`);
const session = require('express-session');
const mkUser = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/build`));
app.use(
  session({
    secret: 'this is totally a secret yo',
    resave: true,
    saveUninitialized: true
  })
);
app.use(mkUser);
app.use((req, res, next) => {
  const { method } = req;
  if (method === 'POST' || method === 'PUT') {
    filter(req, res, next);
  } else {
    next();
  }
});

const messagesBaseUrl = '/api/messages';
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
app.put(`${messagesBaseUrl}`, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);
app.get('/api/messages/history', mc.history);
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
