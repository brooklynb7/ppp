<template lang="pug">
  v-app
    v-toolbar(app,color="teal",dark,fixed)
      v-toolbar-title(@click="navToIndex") 意见反馈
      v-spacer
      avatarName
    v-content
      v-container(fluid,fill-height)
        v-layout(align-content-start,justify-start)
          nuxt
</template>

<script>
import avatarName from '../components/avatarName'

export default {
  components: { avatarName },

  data: () => ({
    drawer: null
  }),
  methods: {
    navToIndex() {
      console.log('test')
    }
  }
}
</script>