<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'feedback',
  middleware: 'authenticated',
  data: () => {
    return { name: 'world' }
  }
}
</script>