<template lang="pug">
div
  v-flex(v-if="showImgs", xs12,sm12,md12,lg12,xl12,wrap)
    img(style="width:100%",v-for="img in imgs", :src="img")
  v-flex(xs12,sm12,md12,lg12,xl12,wrap)
    p(style="word-break:break-all",v-for="msg in msgs") {{msg}}
  v-btn(icon,small,color="primary",fab,fixed,bottom,right,@click="paizhao")
    v-icon photo_camera
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
      wxUploadImgIdx: 0,
      wxServerImgIds: []
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
    clearWxServerImgIds() {
      this.wxServerImgIds = []
    },
    appendWxServerImgId(id) {
      this.wxServerImgIds.push(id)
    },
    appendMsg(msg) {
      this.msgs.push(msg)
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
          that.appendWxServerImgId(serverId)
          that.appendMsg(`Uploaded img server id:${res.serverId}`)

          if (that.wxUploadImgIdx < imgs.length) {
            setTimeout(function() {
              that.uploadImgs(imgs)
            }, 1)
          } else {
            that.appendMsg(
              `Finish uploading ${imgs.length} images to wx server`
            )
            that.retrieveWxServerImgs(that.wxServerImgIds)
            that.clearWxServerImgIds()
            that.clearWxUploadImgIdx()
          }
        },
        fail: function(res) {
          //获取多媒体id失败 返回错误代码
          that.appendMsg(JSON.stringify(res))
          that.clearWxUploadImgIdx()
          that.clearWxServerImgIds()
        }
      })
    },
    async retrieveWxServerImgs(wxServerImgs) {
      this.appendMsg(`Retrieving wxImgs ${wxServerImgs.join(',')}`)

      try {
        await this.$api.retrieveWxImgs(wxServerImgs)
        this.appendMsg(`Retrieved wxImgs`)
      } catch (err) {
        this.appendMsg(`Retrieve wxImgs error ${JSON.stringify(err)}`)
      }
    }
  }
}
</script>