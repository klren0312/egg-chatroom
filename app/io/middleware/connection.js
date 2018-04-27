'use strict'
let usernum = 0
module.exports = app => {
  return async (ctx, next) => {
    // 建立连接
    // 拿到房间号
    let roomId = ctx.socket.handshake.query.room
    let username = ctx.socket.handshake.query.username
    let uid = ctx.socket.id
    // 获取历史数据
    let oldData = await ctx.service.message.get(roomId)
    // console.log(oldData)
    if (oldData) {
      ctx.socket.emit('old message', oldData)
    }
    // 将用户信息存入缓存便于controller调用
    ctx.service.user.setUser(uid, username)
    ctx.socket.join(roomId, () => {
      app.io.to(roomId).emit('online',`欢迎新人加入:${username}`)
    })
    ctx.socket.emit('res', 'connected!')
    ++usernum
    app.io.emit('all user', {
      usernum: usernum
    })
    // 断开连接
    await next()
    --usernum
    app.io.emit('all user', {
      usernum: usernum
    })
    // 用户退出清除用户信息的缓存
    ctx.service.user.delUser(uid)
    ctx.socket.leave(roomId,() => {
      app.io.to(roomId).emit('online',`欢迎新人退出:${username}`)
    })

    console.log('disconnection!',new Date().toLocaleString(),`user:${ctx.socket.id}`)
  }
}