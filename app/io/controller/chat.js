'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async addUser(){
    const {ctx,app} = this
    const nsp = app.io.of('/')
    const message = ctx.args[0] || {}
    const a = await app.redis.set(ctx.socket.id,message.username)
    const c = await ctx.service.user.getUser(ctx.socket.id)
    app.io.emit('online', `欢迎新用户 ${c}`)
  }
  async message() {
    const {ctx, app} = this
    const nsp = app.io.of('/')
    const message = ctx.args[0] || {}
    app.io.emit('new message', {
      data: message,
      user: await app.redis.get(ctx.socket.id) 
            ? await app.redis.get(ctx.socket.id)
            : ctx.socket.id  
    })
  }
}

module.exports = NspController;
