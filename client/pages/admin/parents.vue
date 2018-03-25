<template lang="pug">
v-layout(row,wrap)
  div(class="headline mb-2") 家长列表
  v-flex(xs12,sm12,md12,lg12,xl12)
    v-data-table(:loading="loading",:items="parents",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
      template(slot="items", slot-scope="props")
        td {{ props.item.name }}
        td {{ props.item.realName }}
        td {{ props.item.mobile }}
        td banji
        td {{ getProvider(props.item.provider) }}
        td {{ getRegTime(props.item.created) }}
        td(class="justify-center layout px-0")
          v-btn(icon,class="mx-0",disabled)
            v-icon(color="teal") edit
          v-btn(icon,class="mx-0",disabled)
            v-icon(color="pink") delete          
</template>

<script>
import formatter from '../../utils/formatter'
import moment from 'moment'

export default {
  data: () => {
    return {
      dialog: false,
      noDataText: '暂时没有家长数据',
      loading: false,
      headers: [
        {
          text: '昵称',
          align: 'left',
          sortable: false
        },
        {
          text: '名字',
          align: 'left',
          sortable: false
        },
        {
          text: '手机',
          align: 'left',
          sortable: false
        },
        {
          text: '班级',
          align: 'left',
          sortable: false
        },
        {
          text: '注册来源',
          align: 'left',
          sortable: false,
          width: '6rem'
        },
        {
          text: '注册时间',
          align: 'left',
          sortable: false,
          value: 'created',
          width: '180px'
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      parents: []
    }
  },
  mounted() {
    this.getParents()
  },
  methods: {
    getProvider(value) {
      return formatter.getProvider(value)
    },
    getRegTime(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    async getParents() {
      this.loading = true
      try {
        const parents = await this.$api.getParents()
        this.parents = parents.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
