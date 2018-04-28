'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async say() {
    return 'hello man'
  }
  /**
   * 将socketid和用户名一起存入redis
   * @param {*} uid 
   * @param {*} username 
   */
  async setUser(uid,username) {
    const {ctx,app} = this
    await app.redis.set(uid, username)
  }
  /**
   * 通过socketid获取用户名
   * @param {*} uid 
   */
  async getUser(uid) {
    const {ctx,app} = this
    return await app.redis.get(uid)
  }
  /**
   * 通过socketid删除用户
   * @param {*} uid 
   */
  async delUser(uid) {
    const {ctx,app} = this
    return await app.redis.del(uid)
  }
}

module.exports = UserService;
