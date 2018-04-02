'use strict'

export default function ({ route, store, redirect, env }) {
  if (!store.state.isAuthUser) {
    return redirect(`${env.basePath}signin?cb=${encodeURIComponent(route.fullPath)}`)
  } else {
    if (!store.state.user.isParent) {
      return redirect(`${env.basePath}notParent`)
    }
  }
}
