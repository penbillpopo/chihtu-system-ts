<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">帳號管理</p>
        <el-button icon="el-icon-plus" type="primary" @click="openDialogCreate" >
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
              <el-tag :type="statusColor(row.status)">
                {{ statusText(row.status) }}
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
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="openDialogEdit(scope.$index)">編輯</el-button>
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
import { getUsers } from '@/api/system'
import { ISgetUsers } from '@/api/dto/system/getUsers'
import { IndexTF, ITindex } from './format/indexTF'

@Component({
  name: 'Account',
  components: {
    searchPanel, Dialog
  }
})

export default class extends Vue {
  private tableData: Array<ITindex> = []
  private pageData = {
  	pagesize: 25,
  	page: 1
  }

  private pageTotal = 0

  mounted() {
    this.initData()
  }

  private initData() {
  	getUsers().then((res:any) => {
  		const resData:ISgetUsers = res
  		resData.data.content.forEach(element => {
        const { account, name, roleName, status, updatedAt, id, roleId } = element
  			this.tableData.push(new IndexTF(account, name, roleName, status === '1', updatedAt, id, roleId))
  		})
  	})
  }

  private handleSizeChange(val:any) {
    this.pageData.pagesize = val
  }

  private handleCurrentChange(val:any) {
  	this.pageData.page = val
  }

  private openDialogCreate() {
    const formdata:ITindex = new IndexTF()
    const dialog:any = this.$refs.dialog
    dialog.handleOpen(formdata)
  }

  private openDialogEdit(index = 0) {
  	const formdata:ITindex = this.tableData[index]
  	const dialog:any = this.$refs.dialog
  	dialog.handleOpen(formdata, index)
  }

  private statusColor(status:boolean) {
  	return status ? 'success' : 'info'
  }

  private statusText(status:boolean) {
  	return status ? '啟用' : '停用'
  }
}
</script>
