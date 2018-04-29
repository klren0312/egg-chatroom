'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async message() {
    const {ctx, app} = this
    const message = ctx.args[0] || {}
    const roomId = ctx.socket.handshake.query.room
    let username = ctx.socket.handshake.query.username
    const date = new Date().toLocaleString()
    let data = {
      user: username,
      data: message,
      date: date
    }
    // 将新数据推到redis, EX参数用来设置销毁时间
    app.redis.lpush(roomId, JSON.stringify(data))
    // 将新数据推送给房间的所有人
    app.io.to(roomId).emit('new message', {
      data: message,
      user: username
    })
  }
}

module.exports = NspController;
