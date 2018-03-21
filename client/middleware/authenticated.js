'use strict'

export default function ({ route, store, redirect, env }) {
  if (!store.state.isAuthenticated) {
    return redirect(`${env.basePath}signin?cb=${encodeURIComponent(route.fullPath)}`)
  }
}
