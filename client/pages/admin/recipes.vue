<template lang="pug">
div
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12)
      div(class="mb-2 headline d-inline-flex align-center")
          span(class="headline") 食谱管理
          v-btn(small,color="primary",@click="openDialog")
            v-icon(small) add
            span 添加食谱
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(:loading="loading",:items="recipes",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td {{ props.item.date }}
          td {{ props.item.detail }}
          td {{ props.item.memo }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0", @click="editItem(props.item)")
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",@click="deleteItem(props.item)")
              v-icon(color="pink") delete
  v-dialog(v-model="dialog", max-width="500px",@keydown.esc="dialog=false")
    v-card
      v-card-title
       span(class="headline") {{ formTitle }}
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-menu(
                ref="menu",
                max-width="290px",
                min-width="290px"
                :close-on-content-click="false",
                v-model="menu",
                transition="scale-transition",
                offset-y,full-width)
                v-text-field(
                  required,
                  slot="activator",
                  label="日期",
                  v-model="editedItem.date",
                  prepend-icon="event",
                  readonly)
                v-date-picker(
                  locale="zh-cn",
                  v-model="editedItem.date",
                  no-title,color="primary",
                  @change="chooseDate",
                  :allowed-dates="allowedDates")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(
                label="食谱",
                v-model="editedItem.detail",
                prepend-icon="room_service",
                required)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(label="备注",v-model="editedItem.memo",prepend-icon="comment")
      v-card-actions
        v-spacer
        v-btn(flat,@click="closeDialog") 取消
        v-btn(color="primary",flat,@click="saveRecipe",:loading="loadingSave") 保存
      v-card-text
        v-alert(type="error", :value="showError") {{ errorMsg }}
</template>

<script>
import moment from 'moment'
export default {
  data: () => {
    return {
      showError: false,
      errorMsg: '',
      menu: false,
      dialog: false,
      noDataText: '暂时没有食谱数据',
      loading: false,
      loadingSave: false,
      editedIndex: -1,
      editedItem: {
        date: '',
        detail: '',
        memo: ''
      },
      defaultItem: {
        date: '',
        detail: '',
        memo: ''
      },
      headers: [
        {
          text: '日期',
          align: 'left',
          sortable: false,
          width: '150px'
        },
        {
          text: '食谱信息',
          align: 'left',
          sortable: false
        },
        {
          text: '备注',
          align: 'left',
          sortable: false
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      recipes: []
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '添加食谱' : '编辑食谱'
    }
  },
  mounted() {
    this.getRecipes()
  },
  methods: {
    async getRecipes() {
      this.loading = true
      try {
        const recipes = await this.$api.getRecipes()
        this.recipes = recipes.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    },
    openDialog() {
      this.editedIndex = -1
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.loadingSave = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    chooseDate(date) {
      this.$refs.menu.save(date)
    },
    allowedDates(val) {
      const dayOfWeek = moment(val).weekday()
      return dayOfWeek !== 6 && dayOfWeek !== 0
    },
    editItem(item) {
      this.editedIndex = this.recipes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      confirm(`您确定要删除 ${item.date} 的食谱吗 ?`) && this.removeRecipe(item)
    },
    saveRecipe() {
      this.loadingSave = true
      if (this.editedIndex > -1) {
        this.updateRecipe()
      } else {
        this.addRecipe()
      }
    },
    async addRecipe() {
      try {
        const recipe = await this.$api.addRecipe(this.editedItem)
        this.recipes.unshift(recipe)
        this.closeDialog()
      } catch (err) {
        this.errorMsg = err.response.data.errmsg
        this.showError = true
      } finally {
        this.loadingSave = false
      }
    },
    async updateRecipe() {
      try {
        const recipe = await this.$api.updateRecipe(
          this.editedItem._id,
          this.editedItem
        )
        Object.assign(this.recipes[this.editedIndex], this.editedItem)
        this.closeDialog()
      } catch (err) {
        this.errorMsg = err.response.data.errmsg
        this.showError = true
      } finally {
        this.loadingSave = false
      }
    },
    async removeRecipe(item) {
      this.loading = true
      try {
        await this.$api.removeRecipe(item._id)
        const index = this.recipes.indexOf(item)
        this.recipes.splice(index, 1)
      } catch (err) {
        alert(err.response.data.errmsg)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
