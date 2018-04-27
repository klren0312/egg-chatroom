'use strict';

const Service = require('egg').Service;

class MessageService extends Service {
  /**
   * 存储聊天记录
   * @param {*} roomId 
   * @param {*} uid 
   * @param {*} msg 
   * @param {*} date 
   */
  async store(roomId, username, msg, date) {
    const {ctx, app} = this
    let oldData = await app.redis.get(roomId)
    let data = oldData ? oldData : []
    const {ctx, app} = this
    let dataObj = {}
    dataObj = {
      user: username,
      data: msg,
      date: date
    }
    data.push(dataObj)
    await app.redis.set(roomId, dataObj)
  }
  /**
   * 获取存储的聊天记录
   * @param {*} roomId 
   */
  async get(roomId) {
    const {ctx, app} = this
    return await app.redis.get(roomId)
  }
}

module.exports = MessageService;
