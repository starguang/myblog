
const Controller = require('egg').Controller

class PageController extends Controller {
  async index () {
    const { ctx } = this
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/json'
      ctx.status = 200
      ctx.body = await ctx.service.api.index()
    } catch (error) {
      ctx.logger.error(error)
    }
  }
  async getList() {
    const { ctx } = this;
    ctx.logger.error('ccccccccccccccc')

    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/json'
      ctx.status = 200
      const listData = await ctx.service.api.getList(ctx.query);

      ctx.body = listData
    } catch (error) {
      ctx.logger.error(error)
    }
  }
  async getDetail() {
    const { ctx } = this;
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      ctx.type = 'text/json'
      ctx.status = 200
      const listData = await ctx.service.api.getDetail(ctx.query);

      ctx.body = listData
    } catch (error) {
      ctx.logger.error(error)
    }
  }
}

module.exports = PageController
