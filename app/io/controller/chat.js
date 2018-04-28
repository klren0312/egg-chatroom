'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async message() {
    const {ctx, app} = this
    const nsp = app.io.of('/')
    const message = ctx.args[0] || {}
    const username = await ctx.service.user.getUser(ctx.socket.id) 
    const roomId = ctx.socket.handshake.query.room
    const date = new Date().toLocaleString()
    //FIXME: await ctx.service.message.store(roomId, username, message, date)
    let data = []
    let oldData = await ctx.service.message.get(roomId)
    // 判断是否有旧数据，有则解析赋值给data
    if(oldData!==null){
      data = JSON.parse(oldData)
    }
    // 将数据赋值给data
    data.push({
      user: username,
      data: message,
      date: date
    })
    // 将新数据推到redis, EX参数用来设置销毁时间
    await app.redis.set(roomId, JSON.stringify(data), 'EX', 10*60)
    // 将新数据推送给房间的所有人
    app.io.to(roomId).emit('new message', {
      data: message,
      user: username
    })
  }
}

module.exports = NspController;
