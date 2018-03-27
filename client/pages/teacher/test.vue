<template lang="pug">
div
  a(:href="link") {{link}}
  v-flex(xs12,sm12,md12,lg12,xl12,wrap)
    p(style="word-break:break-all",v-for="msg in msgs") {{msg}}
  v-btn(color="primary",fab,fixed,bottom,right,@click="saoma") 扫码
</template>

<script>
export default {
  data: () => {
    return {
      msgs: ['Debug messages:'],
      link: ''
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
      // that.paizhao()
    })
  },
  methods: {
    appendMsg(msg) {
      this.msgs.push(msg)
    },
    saoma() {
      var that = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          that.link = res.resultStr
          that.appendMsg(JSON.stringify(res))
        },
        fail: function(res) {
          that.appendMsg(JSON.stringify(res))
        }
      })
    }
  }
}
</script>