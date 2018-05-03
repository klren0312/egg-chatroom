'use strict'

module.exports = app => {
  return async (ctx, next) => {
    //建立连接
    const {socket, logger} = ctx
    let {roomId} = socket.handshake.query
    const nsp = app.io.of('/order')
    let socketId = socket.id
    socket.join(roomId)
    logger.debug(`User '${socketId}' connected and wants to join room`)
    nsp.adapter.clients(roomId, (err, clients) => {
      logger.debug('Current online users: ', clients)
      // 广播当前在线用户，以及加入的用户
      nsp.to(roomId).emit('online', {
        payload: {
          currentOnlineUser: clients,
          newUserId: socketId
        }
      })
    })
    
    await next()
    // 断开连接
    nsp.adapter.clients(roomId, (err, clients) => {
      logger.debug('After the client go out,Current online users: ', clients)
      // 广播当前用户退出，以及当前在线用户
      nsp.to(roomId).emit('online', {
        payload: {
          currentOnlineUser: clients,
          newUserId: socketId
        }
      })
    })
  }
}