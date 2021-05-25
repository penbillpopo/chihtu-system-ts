<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">帳號管理</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialog" >
          新增帳號
        </el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          class="table-form"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="account"
            label="帳號(信箱)"
            width="240"
          />
          <el-table-column
            prop="name"
            label="名稱"
            width="200"
          />
          <el-table-column
            prop="roleName"
            label="權限"
            width="200"
          />
          <el-table-column
            prop="status"
            label="狀態"
            width="200"
          >
            <template slot-scope="{row}">
              <el-tag :type="row.status | statusColor">
                {{ row.status | statusText }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            label="最後更新時間"
            sortable
            width="200"
          />
          <el-table-column
            label="操作"
          >
            <template>
              <div>
                <el-button type="primary" size="mini" @click="openDialog">編輯</el-button>
                <el-button type="danger" size="mini">刪除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            :current-page="1"
            :page-sizes="[25, 50, 75, 100]"
            :page-size="25"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <Dialog ref="dialog" />
    </div>
  </div>
</template>

<script lang="ts">

import searchPanel from './searchPanel.vue'
import Dialog from './dialog.vue'
import { Component, Vue } from 'vue-property-decorator'

// import {getUsers} from '@/api/system'
// import {getUsersDto} from '@/api/dto/system.dto'

@Component({
  name: 'Account',
  components: {
    searchPanel, Dialog
  }
})
export default class extends Vue {
  // filters: {
  //   statusColor(status) {
  //     switch (status) {
  //       case '0':
  //         return 'info'
  //       case '1':
  //         return 'success'
  //     }
  //   },
  //   statusText(status) {
  //     switch (status) {
  //       case '0':
  //         return '停用'
  //       case '1':
  //         return '啟用'
  //     }
  //   }
  // },
  private tableData = []
  private pageData = {
    pagesize: 25,
    page: 1
  }

  private pageTotal = 0

  mounted() {
    this.initData()
  }

  private initData() {
    // getUsers().then((res)=>{
    //   res.data.forEach(element => {
    //     this.tableData.push(new getUsersDto(
    //       element.account,
    //       element.name,
    //       element.roleName,
    //       element.status,
    //       element.updatedAt,
    //     ))
    //   });
    //   console.log(this.tableData)
    // })
  }

  private handleSizeChange(val:any) {
    this.pageData.pagesize = val
  }

  private handleCurrentChange(val:any) {
    this.pageData.page = val
  }

  private openDialog() {
    const formdata = {
      account: '',
      name: '',
      roleName: '',
      authority: '',
      status: true
    }
    // this.$refs.dialog.handleOpen(formdata)
  }
}
</script>
