'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524707769885_6419';

  // add your config here
  config.middleware = [];
  // redis config
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  }
  // socket.io config
  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
      }
    },
    redis: {
      host:'127.0.0.1',
      port: 6379,
    }
  }
  // nunjucks
  config.view = {
    defaultViewEngine: 'nunjucks',
  }
  // csrf
  config.security = {
    csrf: {
      enable: false
    }
  }
  return config;
};
