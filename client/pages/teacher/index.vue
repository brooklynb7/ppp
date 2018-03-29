<template lang="pug">
v-container(fluid,fill-height,pa-0)
  v-layout(row,wrap,align-center)
    v-flex(xs12,sm12,class="text-xs-center")
      v-avatar(size="128",style="top:1rem")
        img(:src="$store.state.user.avatar")
    v-flex(xs12,sm12,mb-5)
      v-list(two-line)
        v-list-tile
          v-list-tile-action
            v-icon(color="blue") forum
          v-list-tile-content
            v-list-tile-sub-title 微信/昵称
            v-list-tile-title(class="mt-1") {{$store.state.user.name}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="blue") face
          v-list-tile-content
            v-list-tile-sub-title 老师名字 ({{teacherNameHintText}})
            v-list-tile-title(class="mt-1") {{$store.state.user.teacherName || "-"}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="blue") phone
          v-list-tile-content
            v-list-tile-sub-title 手机
            v-list-tile-title(class="mt-1") {{$store.state.user.mobile || "-"}}
        v-divider(inset)
        v-list-tile
          v-list-tile-action
            v-icon(color="blue") comment
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
              v-text-field(color="blue",label="老师名字",v-model="editedItem.teacherName",prepend-icon="face",:placeholder="teacherNameHintText")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(color="blue",label="手机",v-model="editedItem.mobile",prepend-icon="phone",placeholder="选填")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(color="blue",label="备注",v-model="editedItem.memo",prepend-icon="comment",placeholder="选填")
      v-card-actions
        v-spacer
        v-btn(flat,@click="closeDialog") 取消
        v-btn(color="primary",flat,@click="save",:loading="loadingSave") 保存
      v-card-text(v-if="showError")
        v-alert(type="error", :value="showError") {{ errorMsg }}  
  v-btn(fab,icon,color="blue",dark,fixed,bottom,right,small,@click="edit")
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
      teacherNameHintText: '如：中一班张老师，李英老师...',
      disabled: true,
      editedItem: {
        teacherName: '',
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
        await this.$api.updateTeacherInfo(this.editedItem._id, this.editedItem)
        this.$store.dispatch('updateTeacherInfo', this.editedItem)
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