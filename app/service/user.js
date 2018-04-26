'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async say() {
    return 'hello man'
  }
  async setUser(uid,username) {
    const {ctx,app} = this
    await app.redis.set(uid, username)
  }
  async getUser(uid) {
    const {ctx,app} = this
    return await app.redis.get(uid)
  }
}

module.exports = UserService;
