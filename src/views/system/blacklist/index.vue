<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">黑名單</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialog" >
          新增黑名單
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
            prop="blockIp"
            label="封鎖ip"
            width="240"
          />
          <el-table-column
            prop="createdBy"
            label="建立者"
            width="200"
          />
          <el-table-column
            prop="reason"
            label="原因"
            width="200"
          />
          <el-table-column
            prop="updatedAt"
            label="最後修改時間"
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
import { Component, Vue } from 'vue-property-decorator'

import searchPanel from './searchPanel.vue'
import Dialog from './dialog.vue'
@Component({
  name: 'BlackList',
  components: { searchPanel, Dialog }
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
  private tableData = [
    {
      blockIp: '120.11.25.66',
      createdBy: 'Bill',
      reason: '惡意攻擊',
      updatedAt: '2020/01/08 17:32:50'
    },
    {
      blockIp: '120.11.25.55',
      createdBy: 'Jonny',
      reason: '惡意攻擊',
      updatedAt: '2020/01/08 17:32:50'
    }
  ]

  private pageData = {
    pagesize: 25,
    page: 1
  }

  private pageTotal = 0
  private handleSizeChange(val:any) {
    this.pageData.pagesize = val
  }

  private handleCurrentChange(val:any) {
    this.pageData.page = val
  }

  private openDialog() {
    const formdata = {
      blockIp: '',
      createdBy: '',
      reason: '',
      updatedAt: ''
    }
    // this.$refs.dialog.handleOpen(formdata)
  }
}
</script>
