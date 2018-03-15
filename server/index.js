'use strict'

import Koa from 'koa'
import config from './config'
import middlewares from './middlewares'
import chalk from 'chalk'

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || config.server.port

// Middlewares are imported here.
middlewares(app)

app.listen(port, host, () => {
  // Logging initialization
  console.log('--')
  console.log(chalk.green(`Server started on port ${port}`))
  console.log('--')
})
