<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">商品總覽</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialogCreate">
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
            prop="headImage"
            label="封面圖片"
            min-width="100"
          >
            <template slot-scope="{row}">
              <img class="prodImg" :src="getProdImage(row.headImage)" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="狀態"
            min-width="120"
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
            min-width="120"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="openDialogEdit(scope.$index)">編輯</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index)">刪除</el-button>
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
import { getProducts, deleteProducts } from '@/api/product'
import { IndexTF, ITindex } from './format/indexTF'
import { ISgetProdcut } from '@/api/dto/product/list/getProduct'
import { ProductModule } from '@/store/modules/custom/product'
import { ResponseMsg, MsgType } from '@/share/message'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Account',
  components: {
    searchPanel
  }
})
export default class extends Vue {
  private tableData:ITindex[] = []

  private pageData = {
  	pagesize: 25,
  	page: 1
  }

  private pageTotal = 0
  private categoryOption:any = []

  mounted() {
    this.initData()
    this.initProductModule()
  }

  private statusColor(status:boolean) {
  	return status ? 'success' : 'info'
  }

  private statusText(status:boolean) {
  	return status ? '啟用' : '停用'
  }

  private initData() {
    this.tableData = []
  	getProducts().then((res:any) => {
  		const resData:ISgetProdcut = res
  		resData.data.content.forEach(element => {
        const { id, name, headImage, status, updatedAt } = element
  			this.tableData.push(new IndexTF(id, name, headImage, status === 1, updatedAt))
  		})
  	})
  }

  private initProductModule() {
    if (ProductModule.isIndexRead) {
      ResponseMsg(ProductModule.isSuccess ? MsgType.success : MsgType.failure, ProductModule.msg)
      ProductModule.resetIndexProduct()
    }
  }

  getProdImage(imgName:string) {
    return process.env.VUE_APP_BASE_API + 'product/image?name=' + imgName
  }

  private handleSizeChange(val:any) {
  	this.pageData.pagesize = val
  }

  private handleCurrentChange(val:any) {
  	this.pageData.page = val
  }

  private openDialogCreate() {
  	this.$router.push({
  		path: '/product/productList/edit'
  	})
  }

  private openDialogEdit(index:number) {
  	this.$router.push({
  		path: '/product/productList/edit',
      query: {
        id: this.tableData[index].id
      }
  	})
  }

  private handleDelete(index:number) {
    const deleteId:IQid = {
      id: this.tableData[index].id
    }
    deleteProducts(deleteId).then((res:any) => {
  		const resData:ISnoData = res
      if (resData.success) {
        this.updateData(true, resData.msg)
      } else {
        this.updateData(false, resData.msg)
      }
  	})
  }

  private updateData(isSuccess:boolean, msg:string) {
    ResponseMsg(isSuccess ? MsgType.success : MsgType.failure, msg)
    this.initData()
  }
}
</script>
<style scoped lang="scss">
  .prodImg{
    width: 100px;
    height: 100px;
  }
</style>
