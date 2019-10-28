'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.main.home)
  router.get('/dev', controller.main.dev)
  io.of('/').route('new message', io.controller.chat.message)
  io.of('/').route('old message', io.controller.chat.oldMessage)
};
