'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  io.of('/').route('new message', io.controller.chat.message)
  io.of('/order').route('order', io.controller.order.order)
};
