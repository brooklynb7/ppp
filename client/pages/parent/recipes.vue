<template lang="pug">
v-container(fluid,fill-height,pa-0)
  v-layout(row,wrap)
    v-flex(xs12)
      v-card(color="deep-purple elevation-0")
        v-card-media(src="./static/recipe.jpg",height="160px")
        v-list(two-line)
          template(v-for="recipe in recipes")
            v-list-tile(:key="recipe._id")
              v-list-tile-action(class="mr-3 mt-1")
                span(class="deep-purple--text title") {{recipe.day}}
              v-list-tile-content
                v-list-tile-sub-title {{recipe.date}}
                v-list-tile-title(class="mt-1") {{recipe.detail}}
            v-divider(inset)
</template>

<script>
import formatter from '../../utils/formatter'

export default {
  data: () => {
    return {
      toolbarTitle: '本周食谱',
      loading: false,
      recipes: []
    }
  },
  computed: {
    dates: function() {
      return formatter.getWholeWeekdays()
    }
  },
  mounted() {
    this.$store.commit('setParentToolbarTitle', this.toolbarTitle)
    this.getRecipes()
  },
  methods: {
    async getRecipes() {
      this.loading = true
      const recipes = await this.$api.getRecipesByDates(this.dates)
      recipes.results.forEach(function(item) {
        item.day = formatter.getWeekdayText(item.date)
      })
      this.recipes = recipes.results
    }
  }
}
</script>