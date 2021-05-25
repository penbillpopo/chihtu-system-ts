<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">權限管理</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialog">
          新增權限
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
            prop="name"
            label="權限名稱"
            width="240"
          />
          <el-table-column
            prop="authority"
            min-width="400"
            label="權限"
          />
          <el-table-column
            prop="updatedAt"
            label="最後更新時間"
            sortable
            width="200"
          />
          <el-table-column
            label="操作"
            width="200"
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
  name: 'Authority',
  components: { searchPanel, Dialog }
})

export default class extends Vue {
  private tableData = [
    {
      name: '超級管理員',
      authority: '查詢帳號資訊,查詢新增帳戶,查詢營收付費,查詢活躍帳戶,查詢留存統計,查詢線上公告',
      updatedAt: '2020/01/08 17:32:50'
    },
    {
      name: '管理員',
      authority: '查詢帳號資訊,查詢新增帳戶',
      updatedAt: '2020/01/08 17:32:55'

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
      name: '',
      authority: '',
      status: true
    }
    // this.$refs.dialog.handleOpen(formdata)
  }
}
</script>
