<template lang="pug">
v-card(class="mb-2 elevation-2")
  v-card-title
    div
      div 动态:{{post.status}}
      div 班级:{{(post.banji && post.banji.name) || ''}}
      div 发布时间:{{getCreateTimeText(post.createTime)}}
    template(v-for="photo in post.photos")
      div
        img(style="width:100%", :src="getPhotoSrc(photo)")
  v-card-actions(v-if="enableZan",class="pt-0")    
    v-spacer
    v-btn(flat,icon,color="pink",@click="zan(post)")
      v-icon {{ getFavoriteIcon(post) }}
  v-card-actions(v-if="editable",class="pt-0")    
    v-spacer
    v-btn(flat,icon,color="pink",@click="deletePost(post)",:loading="loadingDelete")
      v-icon remove_circle
</template>

<script>
import * as _ from 'lodash'
import moment from 'moment'

export default {
  data: function() {
    return {
      loadingDelete: false
    }
  },
  props: {
    post: Object,
    editable: {
      type: Boolean,
      defautl: false
    },
    enableZan: {
      type: Boolean,
      defautl: false
    }
  },
  methods: {
    getCreateTimeText(t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    getPhotoSrc(photo) {
      return `./static/photos/${photo.user}/small/${photo.fileName}`
    },
    deletePost(post) {
      confirm(`您确定要删除 "${post.status}" 的动态吗?`) &&
        this.removePost(post)
    },
    isZaned(post) {
      return _.includes(post.zan, this.$store.state.user._id)
    },
    async zan(post) {
      if (this.isZaned(post)) {
        const idx = post.zan.indexOf(this.$store.state.user._id)
        post.zan.splice(idx, 1)
        await this.$api.removeZanForPost(post._id)
      } else {
        post.zan.push(this.$store.state.user._id)
        await this.$api.addZanForPost(post._id)
      }
    },
    getFavoriteIcon(post) {
      return this.isZaned(post) ? 'favorite' : 'favorite_border'
    },
    async removePost(post) {
      this.loadingDelete = true
      try {
        await this.$api.removePost(post._id)
        this.$emit('deleted', post)
      } catch (err) {
        alert(err.response.data.errmsg)
      } finally {
        this.loadingDelete = false
      }
    }
  }
}
</script>