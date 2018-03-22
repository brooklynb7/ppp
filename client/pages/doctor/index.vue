<template lang="pug">
v-layout
  strong(v-html="name")
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