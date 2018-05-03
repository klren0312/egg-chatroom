'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async order() {
    const {ctx,app} = this
    const message = ctx.args[0] || {}
    let { roomId } = ctx.socket.handshake.query
    const nsp = io.of('/order')
    try {
      const { payload } = message
      const { food, price } = message
      nsp.to(roomId).emit('order', {
        name: food,
        price: price
      })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = OrderController;
