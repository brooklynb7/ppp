<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'doctor',
  middleware: 'authenticated',
  data: () => {
    return { name: 'world' }
  }
}
</script>