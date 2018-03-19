<template lang="pug">
  v-app
    v-toolbar(app,color="deep-purple darken-2",dark,fixed)
      v-toolbar-title 我是家属
      v-spacer
      v-btn(icon,large)
        v-avatar(size="32px")
          img(:src="$store.state.authUser.avatar",alt="")
      strong(v-html="$store.state.authUser.name")
    v-content
      v-container(fluid,fill-height)
        v-layout(align-content-start,justify-start)
          nuxt
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>