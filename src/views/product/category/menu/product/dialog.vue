<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="新增分類">
      <el-form ref="dataForm" :rules="rules" :model="formdata" class="formBox">
        <div class="formRow all">
          <el-form-item label="分類名稱" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入名稱" />
          </el-form-item>
        </div>
        <div class="formRow all reduce">
          <optionBox
            :option-list="formdata.optionList"
            :option-list-name="optionListName"
            :rules="optionRules"
            @addOptionbox="addOptionbox"
            @deleteOptionbox="deleteOptionbox"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import optionBox from '@/components/Custom/optionBox.vue'
import { Component, Vue } from 'vue-property-decorator'
import { IndexTF } from './format/indexTF'
import { FormMode } from '@/share/formType'
import { ITdialog, DialogTF, OptionData } from './format/dialogTF'
import { IQcreateProdCategory } from '@/api/dto/product/prodCategory/createProdCategory'
import { IQupdateProdCategory } from '@/api/dto/product/prodCategory/updateProdCategory'
import { createProdCategory, updateProdCategory } from '@/api/product'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'
import { alphanumeriChineseRule } from '@/share/rule'

@Component({
  name: 'Dialog',
  components: {
    optionBox
  }
})
export default class extends Vue {
  /*註記:formdata若定義為any會產生一個奇怪bug，rules中alphanumeriChineseRule的this.$refs
  觸發時會是undefined，導致驗證錯誤 */
  private formdata:ITdialog = new DialogTF()
  private dialogVisible = false
  private formMode:FormMode = FormMode.create
  private rules = {
    name: [
      { required: true, message: '請輸入分類名稱', trigger: 'blur' },
      { validator: alphanumeriChineseRule(this.formdata.name,'name',this.$refs.dataFormTest)
        , trigger: ['change','blur'] }
    ],
  }
  private optionRules = {
    required: true, message: '分類名稱不能為空', trigger: 'blur'
  }
  private optionListName = 'optionList'
  get isCreateMode() {
    return this.formMode === FormMode.create
  }
  
  mounted() {
  }

  private handleClose() {
    const ref:any = this.$refs.dataForm
    ref.clearValidate()
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
        this.formdata = new DialogTF(formdata.name, formdata.secondCategory,
          formdata.id)
        break
    }
  }

  private addOptionbox() {
  	this.formdata.optionList.push(new OptionData())
  }

  private deleteOptionbox(index:number) {
  	this.formdata.optionList.splice(index, 1)
  }

  private submitForm() {
    const categoryList:Array<any> = this.formdata.optionList
    this.formdata.secondCategory = categoryList.map(item => item.optionName).toString()
    const ref:any = this.$refs.dataForm
  	switch (this.formMode) {
      case FormMode.create:
        ref.validate(valid => {
          if (valid) {
            const createFormData:IQcreateProdCategory = {
              name: this.formdata.name,
              secondCategory: this.formdata.secondCategory
            }
            createProdCategory(createFormData).then((res:any) => {
              const resData:ISnoData = res
              if (resData.success) {
                this.$emit('updateData', true, resData.msg)
              } else {
                this.$emit('updateData', false, resData.msg)
              }
              this.handleClose()
            })
          }
        })
        break;
      case FormMode.edit:
        ref.validate(valid => {
          if (valid) {
            const idData:IQid = { id: this.formdata.id }
            const updateFormData:IQupdateProdCategory = {
              name: this.formdata.name,
              secondCategory: this.formdata.secondCategory
            }
            updateProdCategory(updateFormData, idData).then((res:any) => {
              const resData:ISnoData = res
              if (resData.success) {
                this.$emit('updateData', true, resData.msg)
              } else {
                this.$emit('updateData', false, resData.msg)
              }
              this.handleClose()
            })
          }
        })
        break;
  	}
  }
}
</script>
<style scoped lang="scss">
</style>
