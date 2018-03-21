<template lang="pug">
div
  v-btn(color="primary",nuxt,to="/doctor/camera") 相机
</template>

<script>
export default {
  data: () => {
    return { name: 'world' }
  }
}
</script>