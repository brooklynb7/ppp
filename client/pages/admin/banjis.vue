<template lang="pug">
div
  v-layout(row,wrap)   
    listHeader(@add="openDialog",showAddBtn,title="班级管理",addText="新建班级")
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(:loading="loading",:items="banjis",class="elevation-1 hidden-sm-and-down",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td {{ props.item.year }} 届
          td {{ getGradeText(props.item.grade) }}
          td {{ props.item.name }}
          td {{ getTeachersName(props.item.teachers) }}          
          td {{ props.item.memo }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0", @click="editItem(props.item)")
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",disabled)
              v-icon(color="pink") delete
      v-list(two-line,class="hidden-md-and-up elevation-2")
        template(v-for="(item, index) in banjis")
          v-list-tile(:key="item._id")
            v-list-tile-content
              v-list-tile-title {{ item.year }}届, {{ getGradeText(item.grade) }}, {{ item.name }}
              v-list-tile-sub-title(class="body-2") 老师:{{ getTeachersName(item.teachers) }}
              v-list-tile-sub-title 备注: {{ item.memo }}
            v-list-tile-action(class="",style="display:flex;flex-direction:row;align-items:center")
              v-btn(small,icon,class="mx-0", @click="editItem(item)")
                v-icon(color="teal") edit
          v-divider(v-if="index + 1 < banjis.length",:key="index")
  v-btn(
    class="hidden-md-and-up",
    color="primary",
    @click="openDialog"
    fab,dark,bottom,right,small,fixed)
    v-icon add
  v-dialog(v-model="dialog", max-width="500px",@keydown.esc="dialog=false")
    v-card
      v-card-title
       span(class="headline") {{ formTitle }}
      v-card-text
        v-container(grid-list-md)
          v-layout(wrap)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-select(
                prepend-icon="date_range",
                :items="years",
                v-model="editedItem.year",
                label="届",
                required
              )
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-select(
                prepend-icon="grade",
                :items="grades",
                v-model="editedItem.grade",
                item-value="id",
                label="年级",
                required
              )
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(
                label="班名",
                v-model="editedItem.name",
                prepend-icon="class",
                required)
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-select(
                label="老师",
                :items="teachers",
                item-value="_id"
                multiple,
                chips,
                v-model="editedItem.teachers"
                persistent-hint,
                prepend-icon="people_outline"
              )              
            v-flex(xs12,sm12,md12,lg12,xl12)
              v-text-field(label="备注",v-model="editedItem.memo",prepend-icon="comment")
      v-card-actions
        v-spacer
        v-btn(flat,@click="closeDialog") 取消
        v-btn(color="primary",flat,@click="saveBanji",:loading="loadingSave") 保存
      v-card-text(v-if="showError")
        v-alert(type="error", :value="showError") {{ errorMsg }}
</template>

<script>
import * as _ from 'lodash'
import formatter from '../../utils/formatter'
import listHeader from '../../components/listHeader'

export default {
  components: { listHeader },
  data: () => {
    return {
      years: ['2015', '2016', '2017', '2018', '2019', '2020'],
      grades: formatter.getGradeList(),
      showError: false,
      errorMsg: '',
      loading: false,
      loadingSave: false,
      dialog: false,
      noDataText: '暂时没有班级数据',
      editedIndex: -1,
      editedItem: {
        year: '',
        name: '',
        teachers: [],
        memo: ''
      },
      defaultItem: {
        year: '',
        name: '',
        teachers: [],
        memo: ''
      },
      headers: [
        {
          text: '届',
          align: 'left',
          sortable: false,
          width: '100px'
        },
        {
          text: '年级',
          align: 'left',
          sortable: false,
          width: '100px'
        },
        {
          text: '班级',
          align: 'left',
          sortable: false,
          width: '200px'
        },
        {
          text: '老师',
          align: 'left',
          sortable: false
        },
        {
          text: '备注',
          align: 'left',
          sortable: false
        },
        {
          text: '操作',
          align: 'center',
          sortable: false,
          width: '100px'
        }
      ],
      banjis: [],
      teachers: []
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '创建班级' : '编辑班级'
    }
  },
  mounted() {
    this.getBanjis()
    this.getTeachers()
  },
  methods: {
    getGradeText: formatter.getGradeText,
    getTeachersName(teachers) {
      return _.map(teachers, teacher => {
        return teacher.realName || teacher.name || teacher.username
      }).join(',')
    },
    async getTeachers() {
      const rst = await this.$api.getTeachers()
      const teachers = rst.results
      _.each(teachers, teacher => {
        teacher.text = teacher.realName || teacher.name
        this.teachers.push(teacher)
      })
    },
    async getBanjis() {
      this.loading = true
      try {
        const banjis = await this.$api.getBanjis()
        this.banjis = banjis.results
        _.each(this.banjis, item => {
          item.year = item.year.toString()
        })
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    },
    openDialog() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.loadingSave = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    editItem(item) {
      this.editedIndex = this.banjis.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.teachers = _.map(this.editedItem.teachers, '_id')
      this.dialog = true
    },
    saveBanji() {
      this.loadingSave = true
      if (this.editedIndex > -1) {
        this.updateBanji()
      } else {
        this.addBanji()
      }
    },
    async addBanji() {
      try {
        const banji = await this.$api.addBanji(this.editedItem)
        this.banjis.unshift(banji)
        this.closeDialog()
      } catch (err) {
        this.errorMsg = err.response.data.errmsg
        this.showError = true
      } finally {
        this.loadingSave = false
      }
    },
    async updateBanji() {
      try {
        const banji = await this.$api.updateBanji(
          this.editedItem._id,
          this.editedItem
        )
        Object.assign(this.banjis[this.editedIndex], banji)
        this.closeDialog()
      } catch (err) {
        this.errorMsg = err.response.data.errmsg
        this.showError = true
      } finally {
        this.loadingSave = false
      }
    }
  }
}
</script>
