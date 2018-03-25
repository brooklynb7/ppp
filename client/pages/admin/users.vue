<template lang="pug">
v-layout(row,wrap)
  div(class="headline mb-2") 用户列表
  v-flex(xs12,sm12,md12,lg12,xl12)
    v-data-table(:loading="loading",:items="users",class="elevation-1",hide-actions,:headers="headers",:no-data-text="noDataText")
      template(slot="items", slot-scope="props")
        td 
          v-tooltip(bottom)
            span(slot="activator") {{ getUsername(props.item) }}
            span {{ props.item.username }}
        td {{ props.item.name }}
        td {{ props.item.realName }}
        td {{ props.item.mobile }}
        td
          v-checkbox(v-model="props.item.isTeacher",color="primary",@click="toggleIsTeacher(props.item)")
        td
          v-checkbox(loading="true",v-model="props.item.isParent",color="primary",@click="toggleIsParent(props.item)")
        td {{ getProvider(props.item.provider) }}
        td {{ getRegTime(props.item.created) }}
        td(class="justify-center layout px-0")
          v-btn(icon,class="mx-0",disabled,@click="editItem(props.item)")
            v-icon(color="teal") edit
          v-btn(icon,class="mx-0",disabled,@click="deleteItem(props.item)")
            v-icon(color="pink") delete
          </v-btn>
      </template>
</template>

<script>
import formatter from '../../utils/formatter'
import moment from 'moment'

export default {
  data: () => {
    return {
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
    getUsername(item) {
      let username = item.username
      if (item.provider === 'wechat') {
        username = '[微信openid]'
      }
      return username
    },
    getProvider(value) {
      return formatter.getProvider(value)
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
