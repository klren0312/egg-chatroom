'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  /**
   * 接收信息
   */
  async message() {
    const {ctx, app} = this
    const message = ctx.args[0] || {}
    let { roomId, username } = ctx.socket.handshake.query
    console.log(new Date().getTime() -  message)
    
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
  /**
   * 推送历史信息
   */
  async oldMessage() {
    const { ctx, app } = this
    let { roomId } = ctx.socket.handshake.query
    // 获取历史数据
    let oldData = await app.redis.lrange(roomId, 0, 10)
    if (oldData) {
      ctx.socket.emit('old message', oldData)
    }
  }
}

module.exports = ChatController;
