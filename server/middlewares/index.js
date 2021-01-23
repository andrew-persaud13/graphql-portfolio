const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const config = require('../config');

const { initSessionStore } = require('../database');
const { init } = require('./passport');

exports.init = server => {
  const sess = {
    name: 'portfolio-session',
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 1000 * 3600 * 2 },
    resave: false,
    saveUninitialized: false,
    store: initSessionStore(),
  };

  if (process.env.NODE_ENV === 'production') {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
    sess.cookie.httpOnly = true;
    sess.cookie.sameSite = true;
    sess.cookie.domain = process.env.DOMAIN;
  }

  init(passport); //register strategy

  server.use(cors());
  server.use(session(sess));
  server.use(passport.initialize()); //put passport functionality on request object
  server.use(passport.session());
};
