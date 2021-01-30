import log4js from 'koa-log4'
import path from 'path'

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 通过日期来生成文件
      alwaysIncludePattern: true, // 文件名始终以日期区分
      encoding: 'utf-8',
      filename: path.join('back-end/logs/', 'access.log') // 生成文件路径和文件名
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join('back-end/logs/', 'application.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'WARN' }
  }
})

export const accessLogger = () => log4js.koaLogger(log4js.getLogger('access')) // 记录所有访问级别的日志
export const appLogger = log4js.getLogger('application') // 记录所有应用级别的日志