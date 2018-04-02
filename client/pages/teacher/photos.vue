<template lang="pug">
v-container(fluid,pa-2)
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12,wrap)
      post(v-for="post in posts",:key="post._id",:post="post",editable,@deleted="deletePost")
</template>

<script>
import post from '../../components/post'
export default {
  components: { post },
  data: () => {
    return {
      toolbarTitle: '我的发布'
    }
  },
  async asyncData({ app }) {
    let posts = await app.$api.getMyPosts()
    return { posts: posts.results }
  },
  mounted() {
    this.$store.commit('setTeacherToolbarTitle', this.toolbarTitle)
  },
  methods: {
    deletePost(post) {
      const index = this.posts.indexOf(post)
      this.posts.splice(index, 1)
    }
  }
}
</script>