<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'parent',
  middleware: 'authenticated',
  data: () => {
    return { name: 'world' }
  }
}
</script>