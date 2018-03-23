'use strict'

export default function ({ route, store, redirect, env }) {
  if (!store.state.isAuthAdmin) {
    return redirect(`${env.basePath}signinAdmin?cb=${encodeURIComponent(route.fullPath)}`)
  }
}
