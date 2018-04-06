<template lang="pug">
v-chip(color="primary",class="user-item-chip",small,outline,disabled,v-if="text") {{ text }}
</template>

<script>
export default {
  data: () => {
    return {}
  },
  props: {
    text: String
  }
}
</script>