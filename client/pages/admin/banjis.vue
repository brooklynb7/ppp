<template lang="pug">
v-layout(row,wrap)
  div(class="mb-2 headline d-inline-flex align-center")
      span(class="headline") 班级管理
      v-btn(small,disabled,color="primary")
        v-icon(small) add
        span 新建班级
  v-flex(xs12,sm12,md12,lg12,xl12)
    v-data-table(:items="banjis",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
      noDataText: '暂时没有班级数据',
      headers: [
        {
          text: '班级',
          align: 'left',
          sortable: false
        },
        {
          text: '老师',
          align: 'left',
          sortable: false
        },
        {
          text: '操作',
          align: 'left',
          sortable: false
        }
      ],
      banjis: []
    }
  }
}
</script>
