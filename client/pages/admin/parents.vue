<template lang="pug">
div
  v-layout(row,wrap)
    div(class="headline mb-2") 家长列表
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(class="hidden-sm-and-down",:loading="loading",:items="parents",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.parentName }}
          td {{ props.item.mobile }}
          td
          td {{ getProvider(props.item.provider) }}
          td {{ getRegTime(props.item.created) }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0",disabled)
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",disabled)
              v-icon(color="pink") delete
      v-list(two-line,class="hidden-md-and-up elevation-2")
        template(v-for="(item, index) in parents")
          v-list-tile(:key="item._id",@click="openBottomSheet(item)",ripple,class="user-item")
            userItemChip(:text="getBanjiText(item)")
            v-list-tile-avatar(size="32")
              img(:src="item.avatar")
            v-list-tile-content
              v-list-tile-sub-title 微信/昵称: {{ item.name }}
              v-list-tile-sub-title 家长名字: {{ item.parentName }}              
            v-list-tile-action
              v-icon(small,class="mt-4") more_vert
          v-divider(v-if="index + 1 < parents.length",:key="index")
  v-bottom-sheet(v-model="bottomSheet")
    v-list(three-line)
      v-list-tile
        userItemChip(:text="getBanjiText(bottomSheetItem)")
        v-list-tile-avatar
          img(:src="bottomSheetItem.avatar")
        v-list-tile-content
          v-list-tile-sub-title 微信/昵称: {{ bottomSheetItem.name }}          
          v-list-tile-sub-title 家长名字: {{ bottomSheetItem.parentName }}
          v-list-tile-sub-title 来源: {{getProvider(bottomSheetItem.provider)}}
          v-list-tile-sub-title 备注: {{ bottomSheetItem.memo}}
      v-divider
      v-list-tile        
        v-select(
          :items="banjis",
          item-value="_id"
          label="分配班级",
          hide-details,
          v-model="bottomSheetItem.parentBanjiId"
          @change="updateParentBanji",          
          :loading="loadingUpdate")
</template>

<script>
import formatter from '../../utils/formatter'
import moment from 'moment'
import userItemChip from '../../components/userItemChip'

export default {
  components: { userItemChip },
  data: () => {
    return {
      loadingUpdate: false,
      bottomSheetItem: {},
      bottomSheet: false,
      dialog: false,
      noDataText: '暂时没有家长数据',
      loading: false,
      headers: [
        {
          text: '微信/昵称',
          align: 'left',
          sortable: false
        },
        {
          text: '家长名字',
          align: 'left',
          sortable: false
        },
        {
          text: '手机',
          align: 'left',
          sortable: false
        },
        {
          text: '班级',
          align: 'left',
          sortable: false
        },
        {
          text: '注册来源',
          align: 'left',
          sortable: false,
          width: '6rem'
        },
        {
          text: '注册时间',
          align: 'left',
          sortable: false,
          value: 'created',
          width: '180px'
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      parents: [],
      banjis: []
    }
  },
  mounted() {
    this.getParents()
    this.getBanjis()
  },
  methods: {
    getProvider(value) {
      return formatter.getProvider(value)
    },
    getRegTime(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    getBanjiText(item) {
      return (
        (item.parentBanji &&
          `${formatter.getGradeText(item.parentBanji.grade)} ${
            item.parentBanji.name
          }`) ||
        '未指定班级'
      )
    },
    async getBanjis() {
      try {
        const banjis = await this.$api.getBanjis()
        this.banjis = banjis.results
        this.banjis.forEach(item => {
          item.text = `${item.year}届 ${formatter.getGradeText(item.grade)} ${
            item.name
          }`
        })
      } catch (err) {
        alert(err)
      }
    },
    async getParents() {
      this.loading = true
      try {
        const parents = await this.$api.getParents()
        this.parents = parents.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    },
    openBottomSheet(item) {
      this.bottomSheetItem = item
      this.bottomSheetItem.parentBanjiId =
        (item.parentBanji && item.parentBanji._id) || ''
      this.bottomSheet = true
    },
    async updateParentBanji(item) {
      this.loadingUpdate = true
      try {
        const parent = await this.$api.updateParentBanji(
          this.bottomSheetItem._id,
          item
        )
        Object.assign(this.bottomSheetItem, parent)
      } catch (err) {
        console.log(err)
      } finally {
        this.loadingUpdate = false
      }
    }
  }
}
</script>