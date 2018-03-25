<template lang="pug">
v-layout(row,wrap)
  div(class="mb-2 headline d-inline-flex align-center")
      span(class="headline") 新闻管理
      v-btn(small,disabled,color="primary")
        v-icon(small) add
        span 添加新闻
</template>

<script>
export default {
  data: () => {
    return {
      news: []
    }
  }
}
</script>
