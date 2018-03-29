<template lang="pug">
v-container(fluid,grid-list-lg)
  v-layout(row,wrap)
    v-flex(xs12, v-for="recipe in recipes",:key="recipe._id")
      v-card(color="deep-purple",dark)
        v-card-title 
          div(class="headline") {{recipe.date}} {{recipe.day}}
        v-card-text
          div(class="title") {{recipe.detail}}
</template>

<script>
import formatter from '../../utils/formatter'
import { functionDeclaration } from 'babel-types'
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