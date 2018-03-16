<template lang="pug">
  v-app
    v-toolbar(app,color="blue darken-2",dark,fixed)
      v-toolbar-title 我是医生
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