<template lang="pug">
div
  v-layout(row,wrap)
    listHeader(title="用户管理")
    v-flex(xs12,sm12,md12,lg12,xl12)
      v-data-table(class="hidden-sm-and-down",:loading="loading",:items="users",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
        template(slot="items", slot-scope="props")
          td 
            v-tooltip(bottom)
              span(slot="activator") {{ getUsername(props.item) }}
              span {{ props.item.username }}
          td {{ props.item.name }}
          td {{ props.item.realName }}
          td {{ props.item.mobile }}
          td
            v-checkbox(v-model="props.item.isAdmin",color="primary",@click="toggleIsAdmin(props.item)")
          td
            v-checkbox(v-model="props.item.isTeacher",color="primary",@click="toggleIsTeacher(props.item)")
          td
            v-checkbox(v-model="props.item.isParent",color="primary",@click="toggleIsParent(props.item)")
          td {{ getProvider(props.item.provider) }}
          td {{ getRegTime(props.item.created) }}
          td(class="justify-center layout px-0")
            v-btn(icon,class="mx-0",disabled,@click="editItem(props.item)")
              v-icon(color="teal") edit
            v-btn(icon,class="mx-0",disabled,@click="deleteItem(props.item)")
              v-icon(color="pink") delete
      v-list(two-line,class="hidden-md-and-up elevation-2")
        template(v-for="(item, index) in users")
          v-list-tile(:key="item._id",avatar,@click="bottomSheet = !bottomSheet; bottomSheetItem=item",ripple)
            v-list-tile-avatar
              img(:src="item.avatar")
            v-list-tile-content
              v-list-tile-sub-title(class="body-2") 昵称: {{ item.name }}, 名字: {{ item.realName||'未维护' }}               
              v-list-tile-sub-title 角色: {{ getRoleText(item) }}
          v-divider(v-if="index + 1 < users.length",:key="index")
  v-bottom-sheet(v-model="bottomSheet")    
    v-list(two-line)
      v-list-tile(avatar)
        v-list-tile-avatar
          img(:src="bottomSheetItem.avatar")
        v-list-tile-content
          v-list-tile-sub-title(class="body-2") 昵称: {{ bottomSheetItem.name }}, 名字: {{ bottomSheetItem.realName||'未维护' }}               
          v-list-tile-sub-title 角色: {{ getRoleText(bottomSheetItem) }}, 来源: {{getProvider(bottomSheetItem.provider)}}
          v-list-tile-sub-title 备注: {{ bottomSheetItem.memo}}
      v-divider
    v-list
      v-list-tile
        v-flex(xs3,offset-xs9)
          v-switch(label="行政",color="primary",hide-details,v-model="bottomSheetItem.isAdmin",@click="toggleIsAdmin(bottomSheetItem)")
      v-list-tile
        v-flex(xs3,offset-xs9)
          v-switch(label="老师",color="primary",hide-details,v-model="bottomSheetItem.isTeacher",@click="toggleIsTeacher(bottomSheetItem)")
      v-list-tile
        v-flex(xs3,offset-xs9)
          v-switch(label="家长",color="primary",hide-details,v-model="bottomSheetItem.isParent",,@click="toggleIsParent(bottomSheetItem)")
</template>

<script>
import formatter from '../../utils/formatter'
import moment from 'moment'
import listHeader from '../../components/listHeader'

export default {
  components: { listHeader },
  data: () => {
    return {
      bottomSheetItem: {},
      bottomSheet: false,
      dialog: false,
      noDataText: '暂时没有用户数据',
      loading: false,
      headers: [
        {
          text: '用户名',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: '昵称',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: '名字',
          align: 'left',
          sortable: false,
          value: 'realName'
        },
        {
          text: '手机',
          align: 'left',
          sortable: false,
          value: 'mobile',
          width: '180px'
        },
        {
          text: '行政',
          align: 'center',
          sortable: false,
          width: '5rem'
        },
        {
          text: '老师',
          align: 'center',
          sortable: false,
          width: '5rem'
        },
        {
          text: '家长',
          align: 'center',
          sortable: false,
          width: '5rem'
        },
        {
          text: '注册来源',
          align: 'left',
          sortable: false,
          value: 'provider',
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
          value: 'name',
          width: '100px'
        }
      ],
      users: []
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getRoleText: formatter.getRoleText,
    getProvider: formatter.getProvider,
    getUsername(item) {
      let username = item.username
      if (item.provider === 'wechat') {
        username = '[微信openid]'
      }
      return username
    },
    getRegTime(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    async toggleIsTeacher(item) {
      this.loading = true
      try {
        this.$api.updateUserIsTearch({
          id: item._id,
          isTeacher: !item.isTeacher
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async toggleIsParent(item) {
      this.loading = true
      try {
        this.$api.updateUserIsParent({
          id: item._id,
          isParent: !item.isParent
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async toggleIsAdmin(item) {
      this.loading = true
      try {
        this.$api.updateUserIsAdmin({
          id: item._id,
          isAdmin: !item.isAdmin
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async getUsers() {
      this.loading = true
      try {
        const users = await this.$api.getUsers()
        this.users = users.results
      } catch (err) {
        alert(err)
      } finally {
        this.loading = false
      }
    },
    editItem(item) {
      // this.editedIndex = this.items.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
    },

    deleteItem(item) {
      // const index = this.items.indexOf(item)
      // confirm('Are you sure you want to delete this item?') &&
      //   this.items.splice(index, 1)
    }
  }
}
</script>
