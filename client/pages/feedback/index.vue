<template lang="pug">
v-layout
  v-flex
    strong(v-html="name")
    p 我要反馈，建设中
</template>

<script>
export default {
  computed: {
    name: function() {
      return this.$store.state.user ? this.$store.state.user.name : ''
    }
  }
}
</script>