<template>
  <div class="page-container">
    <div class="page-body">
      <searchPanel />
      <div class="head-container">
        <p class="title">權限管理</p>
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialogCreate">
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
            prop="roles"
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
      <Dialog ref="dialog" @updateData="updateData"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import searchPanel from './searchPanel.vue'
import Dialog from './dialog.vue'
import { IndexTF, ITindex } from './format/indexTF'
import { ISgetRoles } from '@/api/dto/system/roles/getRoles'
import { getRoles, deleteRoles } from '@/api/system'
import { AuthTable } from '@/share/authTable'
import { ResponseMsg, MsgType } from '@/share/message'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Authority',
  components: { searchPanel, Dialog }
})

export default class extends Vue {
  private tableData: Array<ITindex> = []
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

  mounted() {
    this.initData()
  }

  private initData() {
    this.tableData = []
  	getRoles().then((res:any) => {
  		const resData:ISgetRoles = res
  		resData.data.content.forEach(element => {
        const { name, roles, updatedAt, id } = element
        const rolesI18 = this.changeCodeToRoles(roles, true)
        const oriRoles = this.changeCodeToRoles(roles, false)
  			this.tableData.push(new IndexTF(name, rolesI18, updatedAt, id, oriRoles))
  		})
  	})
  }

  private changeCodeToRoles(roles:string, isI18:boolean) {
    const codeArr = roles.split(',')
    let decodeArr = null
    if (isI18) {
      decodeArr = codeArr.map(roles => ' ' + this.$t('authority.' + AuthTable.getAuthValueByKey(roles)))
    } else {
      decodeArr = codeArr.map(roles => AuthTable.getAuthValueByKey(roles))
    }
    return decodeArr.toString()
  }

  private updateData(isSuccess:boolean, msg:string) {
    ResponseMsg(isSuccess ? MsgType.success : MsgType.failure, msg)
    this.initData()
  }

  private handleDelete(index:number) {
    const deleteId:IQid = {
      id: this.tableData[index].id
    }
    deleteRoles(deleteId).then((res:any) => {
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
}
</script>
