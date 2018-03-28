<template lang="pug">
  v-app
    v-navigation-drawer(app,fixed,clipped,v-model="drawer",width="180")
      v-list(dense)
        template(v-for="item in items")
          v-list-tile(router :to="item.link")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ item.text }}
    v-toolbar(app,color="blue darken-3",dark,:clipped-left="$vuetify.breakpoint.lgAndUp",fixed)
      v-toolbar-title(style="width:300px", class="ml-0 pl-3")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span(class="title") 行政管理
      v-spacer
      strong(v-if="$store.state.isAuthAdmin",v-html="$store.state.admin.name")
    v-content
      v-container(fluid)
        nuxt
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'person', text: '用户管理', link: '/admin/users' },
      { icon: 'people_outline', text: '老师管理', link: '/admin/teachers' },
      { icon: 'people', text: '家长管理', link: '/admin/parents' },
      { icon: 'view_list', text: '班级管理', link: '/admin/banjis' },
      { icon: 'event_note', text: '新闻管理', link: '/admin/news' },
      { icon: 'restaurant_menu', text: '食谱管理', link: '/admin/recipes' },
      { icon: 'feedback', text: '意见反馈', link: '/admin/feedbacks' },
      { icon: 'help', text: '帮助', link: '/admin/help' }
    ]
  }),
  methods: {
    nav: function(item) {
      this.$nuxt.$router.push({ path: item.link })
    }
  }
}
</script>
