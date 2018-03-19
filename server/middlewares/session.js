'use strict'

import MongooseStore from 'koa-session-mongoose'
import session from 'koa-session'

export default app => {
  app.use(session({ store: new MongooseStore() }, app))
}
