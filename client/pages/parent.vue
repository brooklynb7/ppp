<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'parent',
  middleware: 'authParent'
}
</script>