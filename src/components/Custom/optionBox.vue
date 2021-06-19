
<template>
  <div class="optionBoxGroup">
    <div v-for="(item,index) in optionList" :key="index" class="optionBox">
      <el-form-item :label="index===0?'選項':''"
        :rules="rules"
        :prop="optionListName + '.' + index + '.optionName'">
        <div class="optionItem">
          <el-input v-model="item.optionName" placeholder="請輸入選項名稱" />
          <button
            v-if="index===optionList.length - 1"
            class="optionBtn"
            type="button"
            @click="addOptionbox()"
          >
            <i class="el-icon-circle-plus" />
          </button>
          <button
            v-else
            class="optionBtn"
            type="button"
            @click="deleteOptionbox(index)"
          >
            <i class="el-icon-remove" />
          </button>
        </div>
      </el-form-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'OptionBox'
})
export default class extends Vue {
  @Prop({ type: Array, default: () => [] }) private optionList:Array<any>
  @Prop({ type: String, default: '' }) private optionListName:string
  @Prop({ type: Object, default: () => {} }) private rules:any

  private addOptionbox() {
  	this.$emit('addOptionbox')
  }

  private deleteOptionbox() {
  	this.$emit('deleteOptionbox')
  }
  // @Watch('optionList',{ immediate: true,deep:true })
  // onPropertyChanged(value: string) {
  //   console.log(value)
  // }
}
</script>
<style scoped lang="scss">
    .optionBoxGroup{
        max-height: 400px;
        // @include scrollBar();
        .optionBox{
            margin-bottom: 10px;
            &:nth-last-child(1){
                margin-bottom: 0;
            }
            .optionItem{
                position: relative;
                .optionBtn{
                    position: absolute;
                    right: 0%;
                    bottom: 0%;
                    transform: translate(100%,0%);
                    width: 36px;
                    height: 36px;
                    border: 0;
                    background-color: transparent;
                    cursor: pointer;
                    .el-icon-circle-plus{
                    font-size: 20px;
                    color: #1890ff;
                    }
                    .el-icon-remove{
                    font-size: 20px;
                    color: #ff4949;
                    }
                }
            }
        }
    }
</style>
