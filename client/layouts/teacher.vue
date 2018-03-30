<template lang="pug">
  v-app
    v-toolbar(app,color="blue darken-2",dark,fixed)
      v-toolbar-title {{$store.state.teacherToolbarTitle}}
      v-spacer
      avatarName
    v-content
      nuxt
</template>

<script>
import avatarName from '../components/avatarName'

export default {
  components: { avatarName },

  data: () => ({
    drawer: null
  })
}
</script>