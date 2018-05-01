'use strict'
let usernum = 0
module.exports = app => {
  return async (ctx, next) => {
    // 建立连接
    // 拿到房间号 用户名
    let { roomId, username } = ctx.socket.handshake.query
    // 加入房间
    ctx.socket.join(roomId, () => {
      app.io.to(roomId).emit('online',`欢迎新人加入:${username}`)
    }) 
    await next()
    // 断开连接
    ctx.socket.leave(roomId,() => {
      app.io.to(roomId).emit('online',`欢迎新人退出:${username}`)
    })
    console.log('disconnection!',new Date().toLocaleString(),`user:${ctx.socket.id}`)
  }
}