'use strict'

module.exports = () => {
  return async (ctx, next) => {
    // console.log(ctx.socket.handshake.query.room)
    ctx.socket.emit('keep', '1')
    await next()
    // console.log('packet response')
  }
}