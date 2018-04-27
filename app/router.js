'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  io.of('/').route('new message', io.controller.chat.message)
  // io.of('/').route('add user', io.controller.chat.addUser)
};
