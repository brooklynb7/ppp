<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'teacher',
  middleware: 'authenticated',
  data: () => {
    return { name: 'world' }
  }
}
</script>