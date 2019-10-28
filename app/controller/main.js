'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async home () {
    const { ctx } = this
    await ctx.render('index.html');
  }

  async dev () {
    const { ctx } = this
    await ctx.render('dev.html');
  }
}

module.exports = MainController;
