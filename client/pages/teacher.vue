<template lang="pug">
nuxt-child
</template>

<script>
export default {
  layout: 'teacher',
  middleware: 'authTeacher'
}
</script>