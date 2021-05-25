<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">訂單總覽</p>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          class="table-form"
          style="width: 100%"
        >
          <el-table-column
            prop="number"
            label="訂單編號"
            min-width="120"
          />
          <el-table-column
            prop="name"
            label="姓名"
            min-width="120"
          />
          <el-table-column
            prop="phone"
            label="電話"
            min-width="120"
          />
          <el-table-column
            prop="orderDate"
            label="訂購日期"
            min-width="120"
          />
          <el-table-column
            prop="orderState"
            label="訂單狀態"
            min-width="120"
          />
          <el-table-column
            prop="total"
            label="總額"
            min-width="120"
          />
          <el-table-column
            prop="payment"
            label="付款方式"
            min-width="120"
          />
          <el-table-column
            label="操作"
          >
            <template>
              <div>
                <el-button type="primary" size="mini" @click="openEdit()">編輯</el-button>
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
    </div>
  </div>
</template>

<script lang="ts">
import searchPanel from './searchPanel.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Account',
  components: {
    searchPanel
  }
})
export default class extends Vue {
  /* data */
  private tableData = [
    {
      number: '0123456',
      name: '鬍鬚張',
      phone: '091234567',
      orderDate: '2020/01/08 17:32:30',
      orderState: '已付款',
      total: '100',
      payment: '信用卡'
    },
    {
      number: '0123456',
      name: '鬍鬚張',
      phone: '091234567',
      orderDate: '2020/01/08 17:32:30',
      orderState: '已付款',
      total: '100',
      payment: '信用卡'
    }
  ]

  private pageData = {
    pagesize: 25,
    page: 1
  }

  private pageTotal = 0
  /* method */
  private handleSizeChange(val:number) {
    this.pageData.pagesize = val
  }

  private handleCurrentChange(val:number) {
    this.pageData.page = val
  }

  private openEdit(data:any) {
    this.$router.push({
      path: '/order/orderList/edit',
      query: data
    })
  }
}
</script>
