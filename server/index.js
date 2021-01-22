const express = require('express');
const next = require('next');
const session = require('express-session');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const { connect } = require('./database');

const apolloServer = require('./graphql').createApolloServer();

connect();
app.prepare().then(() => {
  const server = express();
  require('./middlewares').init(server);

  apolloServer.applyMiddleware({ app: server });

  //Pass the request to next
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

//Configure express session, pass this session to mongo store
//give mongo store to the session configuration
