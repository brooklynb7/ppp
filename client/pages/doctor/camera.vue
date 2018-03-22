<template lang="pug">
div
  v-flex(v-if="showImgs", xs12,sm12,md12,lg12,xl12,wrap)
    img(style="width:100%",v-for="img in imgs", :src="img")
  v-flex(xs12,sm12,md12,lg12,xl12,wrap)
    p(style="word-break:break-all",v-for="msg in msgs") {{msg}}
  v-btn(color="primary",fab,fixed,bottom,right,@click="paizhao") 拍照
  //- v-btn(color="primary",fab,fixed,bottom,left,@click="test") test
</template>

<script>
export default {
  computed: {
    showImgs: function() {
      return !!this.imgs.length
    }
  },
  data: () => {
    return {
      msgs: ['Debug messages:'],
      imgs: [],
      wxUploadImgIdx: 0
    }
  },
  async fetch(context) {
    try {
      await context.store.dispatch('getWechatJsConfig', {
        url: context.env.host + context.route.fullPath
      })
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    const that = this
    const wechatJsConfig = this.$nuxt.$store.state.wechatJsConfig
    wx.config(wechatJsConfig)
    wx.error(function(res) {
      that.appendMsg(JSON.stringify(res))
    })
    wx.ready(function() {
      that.paizhao()
    })
  },
  methods: {
    clearWxUploadImgIdx() {
      this.wxUploadImgIdx = 0
    },
    incrementWxUploadImgIdx() {
      this.wxUploadImgIdx++
    },
    appendMsg(msg) {
      this.msgs.push(msg)
    },
    test() {
      this.imgs.push(
        'https://pbs.twimg.com/profile_images/491050769785712640/Nd_khqlu_bigger.jpeg'
      )
      console.log('test')
    },
    paizhao() {
      this.imgs = []
      const that = this
      wx.chooseImage({
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        success: function(res) {
          that.appendMsg(JSON.stringify(res))
          const localIds = res.localIds
          that.imgs = localIds
          that.uploadImgs(localIds)
        },
        fail: function(res) {
          that.appendMsg(JSON.stringify(res))
        }
      })
    },
    uploadImgs(imgs) {
      const that = this
      // 微信同时上传多张图片会卡死
      // https://segmentfault.com/a/1190000005856326
      wx.uploadImage({
        localId: imgs[this.wxUploadImgIdx], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          var serverId = res.serverId // 返回图片的服务器端ID
          that.incrementWxUploadImgIdx()
          that.appendMsg(`Uploaded img server id:${res.serverId}`)

          if (that.wxUploadImgIdx < imgs.length) {
            setTimeout(function() {
              that.uploadImgs(imgs)
            }, 1)
          } else {
            that.clearWxUploadImgIdx()
            that.appendMsg(
              `Finish uploading ${imgs.length} images to wx server`
            )
          }
        },
        fail: function(res) {
          //获取多媒体id失败 返回错误代码
          that.appendMsg(JSON.stringify(res))
          that.clearWxUploadImgIdx()
        }
      })
    }
  }
}
</script>