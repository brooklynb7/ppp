<template lang="pug">
v-container(fluid,pa-2,style="margin-bottom: 60px")
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12,wrap)
      div(style="text-align:center")
        v-progress-circular(v-if="loading",indeterminate,color="deep-purple",size="24")
      div 最近5条动态
      post(
        v-for="post in posts",
        :key="post._id",
        :post="post",
        enableZan)
  v-btn(icon,fab,color="deep-purple",dark,fixed,bottom,right,small,@click="loadPosts()")
    v-icon refresh
</template>

<script>
import post from '../../components/post'

export default {
  components: { post },
  data: function() {
    return {
      posts: [],
      loading: true,
      toolbarTitle: this.$store.state.user.parentBanji
        ? this.$store.state.user.parentBanji.name
        : ''
    }
  },
  async mounted() {
    this.loadPosts()
    this.$store.commit('setParentToolbarTitle', this.toolbarTitle)
  },
  methods: {
    async loadPosts() {
      this.loading = true
      try {
        let posts = await this.$api.getParentBanjiPosts()
        this.posts = posts.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>