'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  const nsp = io.of('/')
  nsp.route('new message', io.controller.chat.message)
  nsp.route('old message', io.controller.chat.oldMessage)
};
