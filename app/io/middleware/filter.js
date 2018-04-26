'use strict'

module.exports = () => {
  return async (ctx, next) => {
    // console.log(ctx.packet)
    ctx.socket.emit('keep', 'keep')
    await next()
    console.log('packet response')
  }
}