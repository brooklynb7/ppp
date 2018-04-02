<template lang="pug">
div
  v-container(fluid,mb-5,pa-2)
    v-layout(row,wrap)
      v-flex(v-for="(img,idx) in imgs",:key="idx", xs12,sm12,md12,lg12,xl12)
        v-card(class="mb-3 elevation-8")
          img(:src="img",width="100%")
          v-card-actions(class="pt-1")
            v-spacer
            v-btn(icon,small,color="pink",flat,@click="removeLocalImg(img)")
              v-icon remove_circle
      v-flex(xs12,sm12,md12,lg12,xl12)
        p(style="word-break:break-all",v-for="msg in msgs") {{msg}}
  v-footer(fixed,height="auto",style="margin-bottom:44px",v-if="showWarning")
    v-alert(
      type="warning",
      class="ma-0 pa-2",      
      style="width:100%",
      dismissible,
      v-model="showWarning") {{warningMsg}}
  v-footer(fixed,height="auto",class="pt-1 pb-1")
    v-btn(icon,color="blue",flat,@click="paizhao",class="ma-0")
      v-icon photo_camera
    v-text-field(
      v-model="statusMsg",
      color="blue",
      placeholder="动态",
      hide-details,
      single-line,
      class="pa-0",
      @input="clearWarningMsg()")
    v-btn(color="blue", @click="send",flat,style="min-width:auto",class="ma-0") 发布
  v-dialog(v-model="sendDialog", max-width="500px",@keydown.esc="sendDialog=false")
    v-card
      v-card-title
       span(class="headline") 发布动态
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-select(
                v-model="defaultBanji"
                prepend-icon="class",
                :items="$store.state.user.teacherBanjis",
                item-text="name",
                item-value="_id"
                label="班级",
              )            
      v-card-actions
        v-spacer
        v-btn(flat,@click="cancelSend") 取消
        v-btn(color="primary",flat,@click="doSend",:loading="loadingSend") 发布
      //- v-card-text(v-if="showError")
      //-   v-alert(type="error", :value="showError") {{ errorMsg }}
</template>

<script>
import * as _ from 'lodash'
export default {
  data: function() {
    return {
      sendDialog: false,
      showWarning: false,
      loadingSend: false,
      warningMsg: '',
      toolbarTitle: '发布动态',
      localImgLimitation: 4,
      statusMsg: '',
      msgs: ['Debug messages:'],
      imgs: [
        // 'http://n.sinaimg.cn/sports/180/w640h340/20180329/i31B-fyssmmc2793406.jpg',
        // 'http://n.sinaimg.cn/sports/180/w640h340/20180329/i31B-fyssmmc2793406.jpg',
        // 'http://n.sinaimg.cn/sports/180/w640h340/20180329/i31B-fyssmmc2793406.jpg'
      ],
      wxUploadImgIdx: 0,
      wxServerImgIds: [],
      defaultBanji:
        (this.$store.state.user.teacherBanjis &&
          this.$store.state.user.teacherBanjis.length > 0 &&
          this.$store.state.user.teacherBanjis[0]._id) ||
        ''
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
    this.$store.commit('setTeacherToolbarTitle', this.toolbarTitle)
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
    clearWarningMsg() {
      this.warningMsg = ''
      this.showWarning = false
    },
    showWarningMsg(msg) {
      this.warningMsg = msg
      this.showWarning = true
    },
    clearStatusMsg() {
      this.statusMsg = ''
    },
    clearLocalImgs() {
      this.imgs = []
    },
    appendLocalImg(img) {
      this.imgs.push(img)
    },
    removeLocalImg(img) {
      const index = this.imgs.indexOf(img)
      this.imgs.splice(index, 1)
    },
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
    exceedLocalImgLimitaion() {
      return this.imgs.length >= this.localImgLimitation
    },
    cancelSend() {
      this.sendDialog = false
    },
    send() {
      if (this.imgs.length === 0) {
        return this.showWarningMsg('请先拍照或选择照片')
      }
      if (!this.statusMsg) {
        return this.showWarningMsg('请填写动态')
      }
      this.sendDialog = true
    },
    doSend() {
      if (!this.defaultBanji) {
        return alert('请选择班级')
      }
      this.loadingSend = true
      this.uploadImgs(this.imgs)
    },
    paizhao() {
      this.clearWarningMsg()
      if (this.exceedLocalImgLimitaion()) {
        this.showWarningMsg(`最多发布${this.localImgLimitation}张照片`)
      }
      // this.imgs = []
      const that = this
      wx.chooseImage({
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        success: function(res) {
          that.appendMsg(JSON.stringify(res))
          const localIds = res.localIds
          localIds.forEach(function(item) {
            if (!that.exceedLocalImgLimitaion()) {
              that.appendLocalImg(item)
            }
          })
          // that.imgs = localIds
          // that.uploadImgs(localIds)
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
        success: async function(res) {
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
            await that.retrieveWxServerImgs(that.wxServerImgIds)
            that.clearWxServerImgIds()
            that.clearWxUploadImgIdx()
            that.clearStatusMsg()
            that.clearLocalImgs()
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
        const photos = await this.$api.retrieveWxImgs(wxServerImgs)
        this.appendMsg(`Retrieved wxImgs`)
        await this.$api.addPost({
          status: this.statusMsg,
          photos: _.map(photos, '_id'),
          banji: this.defaultBanji
        })
        this.appendMsg(`Post added`)
      } catch (err) {
        this.appendMsg(`Retrieve wxImgs error ${JSON.stringify(err)}`)
      } finally {
        this.loadingSend = false
        this.sendDialog = false
      }
    }
  }
}
</script>