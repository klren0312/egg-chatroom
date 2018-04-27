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
    if(oldData!==null){
      data = JSON.parse(oldData)
    }
    data.push({
      user: username,
      data: message,
      date: date
    })
    await app.redis.set(roomId, JSON.stringify(data))
    app.io.to(roomId).emit('new message', {
      data: message,
      user: username
    })
  }
}

module.exports = NspController;
