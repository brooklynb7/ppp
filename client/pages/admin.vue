<template lang="pug">
  div
    h1 Building ...
    nuxt-child
</template>

<script>
export default {
  layout: 'admin',
  data: () => {
    return { name: 'world' }
  }
}
</script>
