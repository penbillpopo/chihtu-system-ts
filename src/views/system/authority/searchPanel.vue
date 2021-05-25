<template>
  <div class="search-panel">
    <el-form ref="form" class="search-form">
      <el-form-item prop="text" class="small-gap">
        <el-input placeholder="請輸入搜尋權限名稱" />
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
  private option = 'name'
}
</script>
<style scoped lang="scss">
</style>
