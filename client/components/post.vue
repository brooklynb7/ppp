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
</template>

<script>
import * as _ from 'lodash'
import moment from 'moment'

export default {
  props: {
    post: Object
  },
  methods: {
    getCreateTimeText(t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    getPhotoSrc(photo) {
      return `./static/photos/${photo.user}/small/${photo.fileName}`
    }
  }
}
</script>