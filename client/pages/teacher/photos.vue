<template lang="pug">
div
  v-flex(xs12,sm12,md12,lg12,xl12,wrap)
    template(v-for="photo in photos")
      p(style="word-break:break-all") {{photo.src}}
      img(style="width:100%", :src="photo.src")  
</template>

<script>
import * as _ from 'lodash'

export default {
  data: () => {
    return {}
  },
  async asyncData({ app }) {
    let photos = await app.$api.getMyPhotos()
    photos = _.map(photos.results, photo => {
      photo.src = `./static/photos/${photo.user}/small/${photo.fileName}`
      return photo
    })
    return { photos: photos }
  }
}
</script>