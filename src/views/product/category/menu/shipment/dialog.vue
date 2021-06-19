<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增分類">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow all">
          <el-form-item label="分類名稱" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入名稱" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IndexTF } from './format/indexTF'
import { FormMode } from '@/share/formType'
import { DialogTF } from './format/dialogTF'
import { IQcreateShipCategory } from '@/api/dto/product/shipCategory/createShipCategory'
import { IQupdateShipCategory } from '@/api/dto/product/shipCategory/updateShipCategory'
import { createShipCategory, updateShipCategory } from '@/api/product'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  private formdata:any = {}
  private dialogVisible = false
  private formMode:FormMode = FormMode.create
  private handleClose() {
  	this.dialogVisible = false
  }

  private handleOpen(formdata:IndexTF, editId:number) {
  	this.dialogVisible = true
    this.formMode = editId === undefined ? FormMode.create : FormMode.edit
    switch (this.formMode) {
      case FormMode.create:
        this.formdata = new DialogTF()
        break
      case FormMode.edit:
        this.formdata = new DialogTF(formdata.name, formdata.id)
        break
    }
  }

  private submitForm() {
  	switch (this.formMode) {
      case FormMode.create:
        const createFormData:IQcreateShipCategory = {
          name: this.formdata.name
        }
        createShipCategory(createFormData).then((res:any) => {
          const resData:ISnoData = res
          if (resData.success) {
            this.$emit('updateData', true, resData.msg)
          } else {
            this.$emit('updateData', false, resData.msg)
          }
          this.handleClose()
        })
        break
      case FormMode.edit:
        const idData:IQid = { id: this.formdata.id }
        const updateFormData:IQupdateShipCategory = {
          name: this.formdata.name
        }
        updateShipCategory(updateFormData, idData).then((res:any) => {
          const resData:ISnoData = res
          if (resData.success) {
            this.$emit('updateData', true, resData.msg)
          } else {
            this.$emit('updateData', false, resData.msg)
          }
          this.handleClose()
        })
        break
  	}
  }
}
</script>
<style scoped lang="scss">
</style>
