<template lang="pug">
div
  v-layout(row,wrap)
    v-flex(xs12,sm12,md12,lg12,xl12)
      div(class="mb-2 headline d-inline-flex align-center")
          span(class="headline") 食谱管理
          v-btn(small,color="primary",@click="openNewDialog")
            v-icon(small) add
            span 添加食谱
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(:loading="loading",:items="recipes",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td {{ props.item.date }}
          td {{ props.item.detail }}
          td {{ props.item.memo }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0",disabled)
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",disabled)
              v-icon(color="pink") delete
  v-dialog(v-model="dialog", max-width="500px")
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
                  slot="activator",
                  label="日期",
                  v-model="editedItem.date",                
                  readonly)
                v-date-picker(
                  locale="zh-cn",
                  v-model="editedItem.date",
                  no-title,color="primary",
                  @change="chooseDate",
                  :allowed-dates="allowedDates")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(label="食谱",v-model="editedItem.detail")
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(label="备注",v-model="editedItem.memo")
      v-card-actions
        v-spacer
        v-btn(flat,@click="closeDialog") 取消
        v-btn(color="primary",flat,@click="") 保存
</template>

<script>
import moment from 'moment'
export default {
  data: () => {
    return {
      menu: false,
      dialog: false,
      noDataText: '暂时没有食谱数据',
      loading: false,
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
          sortable: false
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
  methods: {
    openNewDialog() {
      this.editedIndex = -1
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    chooseDate(date) {
      this.$refs.menu.save(date)
    },
    allowedDates(val) {
      const dayOfWeek = moment(val).weekday()
      return dayOfWeek !== 6 && dayOfWeek !== 0
    }
  }
}
</script>
