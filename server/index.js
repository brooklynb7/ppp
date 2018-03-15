'use strict'

import Koa from 'koa'
import config from './config'
import middlewares from './middlewares'
import chalk from 'chalk'
import moment from 'moment'

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || config.server.port

// Middlewares are imported here.
middlewares(app)

app.listen(port, host, () => {
  // Logging initialization
  console.log('--')
  console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Server started on port ${port}`))
  console.log('--')
})
