'use strict'

module.exports = () => {
  return async (ctx, next) => {
    // console.log(ctx.socket.handshake.query.room)
    ctx.socket.emit('keep', 'keep')
    await next()
    // console.log('packet response')
  }
}