<template lang="pug">
v-container(fluid,pa-2,style="margin-bottom:60px")
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12,wrap)
      div(style="text-align:center")
        v-progress-circular(v-if="loading",indeterminate,color="blue",size="24")
      post(v-for="post in posts",:key="post._id",:post="post",editable,@deleted="deletePost")
  v-footer(fixed,height="auto",class="pt-1 pb-1")
    v-spacer
    v-pagination(:length="pageLength",v-model="page",circle,@input="paginate",:total-visible="7")
</template>

<script>
import post from '../../components/post'
export default {
  components: { post },
  data: () => {
    return {
      pageLength: 0,
      page: 1,
      pageSize: 3,
      loading: true,
      toolbarTitle: '我的发布',
      posts: []
    }
  },
  mounted() {
    this.loadMyPosts()
    this.$store.commit('setTeacherToolbarTitle', this.toolbarTitle)
  },
  methods: {
    async loadMyPosts() {
      this.loading = true
      try {
        let posts = await this.$api.getMyPosts(this.page - 1, this.pageSize)
        this.posts = posts.results
        this.pageLength = Math.ceil(posts.count / this.pageSize)
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    },
    paginate() {
      this.loadMyPosts()
    },
    deletePost(post) {
      const index = this.posts.indexOf(post)
      this.posts.splice(index, 1)
    }
  }
}
</script>