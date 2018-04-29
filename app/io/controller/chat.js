'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async message() {
    const {ctx, app} = this
    
    const message = ctx.args[0] || {}
    const roomId = ctx.socket.handshake.query.room
    let username = ctx.socket.handshake.query.username
    // console.log(new Date().getTime() -  message)
    
    // 将新数据推送给房间的所有人
    app.io.to(roomId).emit('new message', {
      data: message,
      user: username
    })
    
    // 将新数据推到redis
    let data = {
      user: username,
      data: message,
      date: new Date().toLocaleString()
    }
    app.redis.lpush(roomId, JSON.stringify(data))
    
  }
}

module.exports = ChatController;
