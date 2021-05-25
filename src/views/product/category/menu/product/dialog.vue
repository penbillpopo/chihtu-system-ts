<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="新增分類">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow all">
          <el-form-item label="分類名稱" prop="name">
            <el-input v-model="formdata.name" placeholder="請輸入名稱" />
          </el-form-item>
        </div>
        <div class="formRow all reduce">
          <optionBox
            :option-list="formdata.optionList"
            @addOptionbox="addOptionbox"
            @deleteOptionbox="deleteOptionbox"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">確認</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import optionBox from '@/components/Custom/optionBox.vue'
import { Component, Vue } from 'vue-property-decorator'
class OptionData {
  optionName = ''
}

@Component({
  name: 'Dialog',
  components: {
    optionBox
  }
})
export default class extends Vue {
  private formdata:any = {}
  private dialogVisible = false
  private handleClose() {
    this.dialogVisible = false
  }

  private handleOpen(formdata:any) {
    this.dialogVisible = true
    this.formdata = Object.assign({}, formdata)
  }

  private addOptionbox() {
    this.formdata.optionList.push(new OptionData())
  }

  private deleteOptionbox(index:number) {
    this.formdata.optionList.splice(index, 1)
  }
}
</script>
<style scoped lang="scss">
</style>
