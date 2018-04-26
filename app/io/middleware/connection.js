'use strict'
let usernum = 0
module.exports = app => {
  return async (ctx, next) => {
    await ctx.socket.join('room'+ctx.socket.id)
    console.log(ctx.socket.request.headers)
    ctx.socket.emit('res', 'connected!')
    ++usernum
    app.io.emit('all user', {
      usernum: usernum
    })
    await next()
    --usernum
    app.io.emit('all user', {
      usernum: usernum
    })
    console.log('disconnection!',new Date().toLocaleString(),`user:${ctx.socket.id}`)
  }
}