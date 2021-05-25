<template>
  <div class="search-panel">
    <el-form ref="form" class="search-form">
      <el-form-item prop="text" class="small-gap">
        <el-input placeholder="請輸入搜尋文字" />
      </el-form-item>
      <el-form-item class="small-gap">
        <el-select v-model="option" placeholder="请选择">
          <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary">查詢</el-button>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SearchPanel'
})
export default class extends Vue {
  private option = 'email'
  private optionList = [{
    value: 'email',
    label: '帳號(信箱)'
  }, {
    value: 'name',
    label: '名稱'
  }, {
    value: 'phone',
    label: '電話'
  }, {
    value: 'authority',
    label: '權限'
  }]
}
</script>
<style scoped lang="scss">
</style>
