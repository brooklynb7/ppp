<template lang="pug">
v-container(fluid,fill-height,pa-0)
  v-layout(row,wrap,align-center)
    v-flex(xs12,sm12,class="text-xs-center")
      v-avatar(size="128",style="top:2rem")
        img(:src="$store.state.user.avatar")
    v-flex(xs12,sm12,mb-2)
      v-list(two-line)
        v-list-tile
          v-list-tile-action
            v-icon(color="deep-purple") forum
          v-list-tile-content
            v-list-tile-sub-title 微信/昵称
            v-list-tile-title(class="mt-1") {{$store.state.user.name}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="deep-purple") face
          v-list-tile-content
            v-list-tile-sub-title 家长名字 ({{parentNameHintText}})
            v-list-tile-title(class="mt-1") {{$store.state.user.parentName || "-"}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="deep-purple") phone
          v-list-tile-content
            v-list-tile-sub-title 手机
            v-list-tile-title(class="mt-1") {{$store.state.user.mobile || "-"}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="deep-purple") comment
          v-list-tile-content
            v-list-tile-sub-title 备注
            v-list-tile-title(class="mt-1") {{$store.state.user.memo || "-"}}
  v-dialog(v-model="dialog", max-width="500px",@keydown.esc="dialog=false")
    v-card
      v-card-title
       span(class="headline") 编辑个人信息
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(color="deep-purple",label="家长名字",v-model="editedItem.parentName",prepend-icon="face",:placeholder="parentNameHintText")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(color="deep-purple",label="手机",v-model="editedItem.mobile",prepend-icon="phone",placeholder="选填")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(color="deep-purple",label="备注",v-model="editedItem.memo",prepend-icon="comment",placeholder="选填")
      v-card-actions
        v-spacer
        v-btn(flat,@click="closeDialog") 取消
        v-btn(color="primary",flat,@click="save",:loading="loadingSave") 保存
      v-card-text(v-if="showError")
        v-alert(type="error", :value="showError") {{ errorMsg }}  
  v-btn(fab,icon,color="deep-purple",dark,fixed,bottom,right,small,@click="edit")
    v-icon edit
</template>

<script>
export default {
  data: function() {
    return {
      showError: false,
      errorMsg: '',
      loadingSave: false,
      dialog: false,
      parentNameHintText: '如：小乐妈妈，张晨爸爸...',
      disabled: true,
      editedItem: {
        parentName: '',
        mobile: '',
        memo: ''
      }
    }
  },
  computed: {},
  methods: {
    showError(msg) {
      this.showError = true
      this.errorMsg = msg
    },
    clearError() {
      this.showError = false
      this.errorMsg = ''
    },
    edit() {
      this.editedItem = Object.assign({}, this.$store.state.user)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async save() {
      try {
        await this.$api.updateParentInfo(this.editedItem._id, this.editedItem)
        // Object.assign(this.user, this.editedItem)
        this.$store.dispatch('updateParentInfo', this.editedItem)
        this.closeDialog()
      } catch (err) {
        this.showError(err.response.data.errmsg)
      } finally {
        this.loadingSave = false
      }
    }
  }
}
</script>