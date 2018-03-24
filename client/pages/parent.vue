<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'parent',
  middleware: 'authUser',
  data: () => {
    return { name: 'world' }
  }
}
</script>