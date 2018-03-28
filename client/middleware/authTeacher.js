'use strict'

export default function ({ route, store, redirect, env }) {
  if (!store.state.isAuthUser) {
    return redirect(`${env.basePath}signin?cb=${encodeURIComponent(route.fullPath)}`)
  } else {
    if (!store.state.user.isTeacher) {
      return redirect(`${env.basePath}notTeacher`)
    }
  }
}
