<template lang="pug">
  v-app
    v-navigation-drawer(app,fixed,clipped,v-model="drawer")
      v-list(dense)
       template(v-for="item in items")
        v-list-tile(@click="", :key="item.text")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.text }}
    v-toolbar(app,color="blue darken-3",dark,:clipped-left="$vuetify.breakpoint.lgAndUp",fixed)
      v-toolbar-title(style="width:300px", class="ml-0 pl-3")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span(class="hidden-sm-and-down") 后台管理
    v-content
      v-container(fluid,fill-height)
        v-layout(align-content-start,justify-start)
          nuxt
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'person', text: '用户管理' },
      { icon: 'help', text: '帮助' }
    ]
  })
}
</script>
