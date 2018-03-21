<template lang="pug">
div
  v-btn(color="primary") 拍照
  v-btn(color="primary") 相册
  v-btn(color="primary") 扫码
  v-btn(color="primary",nuxt,to="/doctor") 返回
</template>

<script>
export default {
  data: () => {
    return { name: 'world' }
  }
}
</script>