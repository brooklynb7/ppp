<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'teacher',
  middleware: 'authUser',
  data: () => {
    return { name: 'world' }
  }
}
</script>