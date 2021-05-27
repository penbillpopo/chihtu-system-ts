<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">商品總覽</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openEdit()">
          新增商品
        </el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="tableData"
          class="table-form"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="商品名稱"
            min-width="120"
          />
          <el-table-column
            prop="number"
            label="商品貨號"
            min-width="120"
          />
          <el-table-column
            prop="spec"
            label="規格"
            min-width="120"
          />
          <el-table-column
            prop="price"
            label="價格"
            min-width="120"
          />
          <el-table-column
            prop="sales"
            label="已售出"
            min-width="120"
          />
          <el-table-column
            prop="updatedAt"
            label="最後更新時間"
            sortable
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
import { Component, Vue } from 'vue-property-decorator'
import searchPanel from './searchPanel.vue'
@Component({
  name: 'Account',
  components: {
    searchPanel
  }
})
export default class extends Vue {
  private tableData = [
  	{
  		name: '哥吉拉',
  		number: '0123456789',
  		spec: '大',
  		price: '3000',
  		sales: '12',
  		updatedAt: '2020/01/08 17:32:50'
  	},
  	{
  		name: '哥吉拉',
  		number: '0123456788',
  		spec: '小',
  		price: '2000',
  		sales: '10',
  		updatedAt: '2020/01/08 17:32:30'
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

  private openEdit(data:any) {
  	this.$router.push({
  		path: '/product/productList/edit',
  		query: data
  	})
  }
}
</script>
