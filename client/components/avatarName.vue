<template lang="pug">
  div
    v-btn(icon,large)
      v-avatar(size="32px")
          img(:src="$store.state.authUser.avatar",alt="")
    strong(v-html="$store.state.authUser.name")
</template>

<script>
export default {}
</script>