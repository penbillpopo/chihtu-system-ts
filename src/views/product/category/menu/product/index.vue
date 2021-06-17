<template>
  <div class="page-container app">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">商品分類</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialogCreate">
          新增分類
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
            label="一級分類名稱"
            min-width="120"
          />
          <el-table-column
            prop="secondCategory"
            label="二級分類名稱"
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
      <Dialog ref="dialog" class="small" @updateData="updateData"/>
    </div>
  </div>
</template>

<script lang="ts">
import searchPanel from './searchPanel.vue'
import Dialog from './dialog.vue'
import { Component, Vue } from 'vue-property-decorator'
import { getProdCategory, deleteProdCategory } from '@/api/product'
import { ISgetProdCategory } from '@/api/dto/product/prodCategory/getProdCategory'
import { IndexTF, ITindex } from './format/indexTF'
import { ResponseMsg, MsgType } from '@/share/message'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Product',
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

  private handleSizeChange(val:any) {
  	this.pageData.pagesize = val
  }

  private handleCurrentChange(val:any) {
  	this.pageData.page = val
  }

  private initData() {
    this.tableData = []
  	getProdCategory().then((res:any) => {
  		const resData:ISgetProdCategory = res
  		resData.data.content.forEach(element => {
        const { name, secondCategory, updatedAt, id } = element
  			this.tableData.push(new IndexTF(id, name, secondCategory.toString(), updatedAt))
  		})
  	})
  }

  private handleDelete(index:number) {
    const deleteId:IQid = {
      id:this.tableData[index].id
    } 
    deleteProdCategory(deleteId).then((res:any) => {
  		const resData:ISnoData = res
      if (resData.success) {
        this.updateData(true, resData.msg)
      } else {
        this.updateData(false, resData.msg)
      }
  	})
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

  private updateData(isSuccess:boolean, msg:string) {
    ResponseMsg(isSuccess ? MsgType.success : MsgType.failure, msg)
    this.initData()
  }
}
</script>
