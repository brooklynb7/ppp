<template lang="pug">
v-container(fluid,pa-2)
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12,wrap)
      div 最近5条动态
      v-card(v-for="post in posts",:key="_id",class="mb-2 elevation-2")
        v-card-title
          div
            div 发布时间:{{getCreateTimeText(post.createTime)}}
          template(v-for="photo in post.photos")
            div
              img(style="width:100%", :src="getPhotoSrc(photo)")
</template>

<script>
import * as _ from 'lodash'
import moment from 'moment'

export default {
  data: function() {
    return {
      toolbarTitle: this.$store.state.user.parentBanji
        ? this.$store.state.user.parentBanji.name
        : ''
    }
  },
  async asyncData({ app }) {
    let posts = await app.$api.getParentBanjiPosts()
    return { posts: posts.results }
  },
  mounted() {
    this.$store.commit('setParentToolbarTitle', this.toolbarTitle)
  },
  methods: {
    getCreateTimeText(t) {
      return moment(t).format('YYYY-MM-DD')
    },
    getPhotoSrc(photo) {
      return `./static/photos/${photo.user}/small/${photo.fileName}`
    }
  }
}
</script>