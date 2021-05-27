<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">登入記錄</p>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          class="table-form"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="email"
            label="帳號(信箱)"
            width="240"
          />
          <el-table-column
            prop="name"
            label="名稱"
            width="200"
          />
          <el-table-column
            prop="ip"
            label="IP"
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
            prop="loginAt"
            sortable
            label="登入時間"
          />
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
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import searchPanel from './searchPanel.vue'
@Component({
  name: 'Log',
  components: { searchPanel }

})
export default class extends Vue {
  // filters: {
  //   statusColor(status) {
  //     switch (status) {
  //       case '0':
  //         return 'danger'
  //       case '1':
  //         return 'success'
  //     }
  //   },
  //   statusText(status) {
  //     switch (status) {
  //       case '0':
  //         return '登入失敗'
  //       case '1':
  //         return '登入成功'
  //     }
  //   }
  // },
  private tableData = [
  	{
  		email: 'pen@gmail.com',
  		name: 'Bill',
  		ip: '120.11.34.57',
  		status: '1',
  		loginAt: '2020/01/08 17:32:50'
  	},
  	{
  		email: 'jonny@gmail.com',
  		name: 'Jonny',
  		ip: '120.11.34.66',
  		status: '0',
  		loginAt: '2020/01/08 17:32:55'
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
}
</script>
