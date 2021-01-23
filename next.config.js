const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    BASE_URL: !dev
      ? 'https://persaudgql.herokuapp.com/graphql'
      : 'http://localhost:3000/graphql',
  },
};
