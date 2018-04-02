<template lang="pug">
v-container(fluid,pa-2)
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12,wrap)
      div 最近5条动态
      post(v-for="post in posts",:key="post._id",:post="post")
</template>

<script>
import post from '../../components/post'
export default {
  components: { post },
  data: () => {
    return {
      toolbarTitle: '班级动态'
    }
  },
  async asyncData({ app }) {
    let posts = await app.$api.getTeacherBanjiPosts()
    return { posts: posts.results }
  },
  mounted() {
    this.$store.commit('setTeacherToolbarTitle', this.toolbarTitle)
  },
  methods: {}
}
</script>