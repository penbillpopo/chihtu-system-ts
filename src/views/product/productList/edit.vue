<template>
  <div class="page-container hasBottomField">
    <!-- <router-link to="/product/productList">
        Back
    </router-link> -->
    <div class="page-body">
      <el-form ref="dataForm" :model="formdata" class="formBox">
        <div class="formRow">
          <el-form-item label="商品名稱" prop="name" class="formItem">
            <el-input v-model="formdata.name" placeholder="請輸入商品名稱" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="商品一級分類" prop="firstCategory">
            <el-select v-model="formdata.firstCategory" placeholder="請選擇一級分類">
              <el-option v-for="(item,index) in firstCategoryOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品二級分類" prop="secondCategory">
            <el-select v-model="formdata.secondCategory" placeholder="請選擇二級分類">
              <el-option v-for="(item,index) in secondCategoryOption" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </div>
        <div class="formRow all">
          <el-form-item label="商品詳情" prop="detail">
            <el-input v-model="formdata.detail" placeholder="請輸入商品詳情" type="textarea" />
          </el-form-item>
        </div>
        <div class="formRow">
          <el-form-item label="有無規格" prop="hasSpec">
            <el-radio v-model="formdata.hasSpec" label="0">無</el-radio>
            <el-radio v-model="formdata.hasSpec" label="1">有</el-radio>
          </el-form-item>
        </div>
        <div v-if="formdata.hasSpec==='0'">
          <div class="formRow">
            <el-form-item label="商品價格" prop="price">
              <el-input v-model="formdata.price" placeholder="請輸入商品價格" />
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="商品數量" prop="count">
              <el-input v-model="formdata.count" placeholder="請輸入商品數量" />
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="商品貨號" prop="number">
              <el-input v-model="formdata.number" placeholder="請輸入商品貨號" />
            </el-form-item>
          </div>
        </div>
        <div v-else class="specField">
          <div v-for="(item,index) in formdata.specList" :key="index" class="specGroup">
            <div class="specbox">
              <el-form-item label="規格名稱" prop="">
                <el-input v-model="item.specName" placeholder="請輸入規格名稱" />
              </el-form-item>
              <div v-for="(subitem,subindex) in item.optionList" :key="subindex" class="optionBox">
                <el-form-item :label="subindex===0?'選項':''">
                  <div class="optionItem">
                    <el-input :value="subitem.optionName" placeholder="請輸入選項名稱" @input="optionListChange($event,subitem)"/>
                    <button
                      v-if="subindex===item.optionList.length - 1"
                      class="optionBtn"
                      type="button"
                      @click="addOptionbox(item)"
                    >
                      <i class="el-icon-circle-plus" />
                    </button>
                    <button
                      v-if="item.optionList.length>1"
                      :class="'optionBtn '+lastRemoveOptionClass(subindex===item.optionList.length - 1)"
                      type="button"
                      @click="deleteOptionbox(item,index,subindex)"
                    >
                      <i class="el-icon-remove" />
                    </button>
                  </div>
                </el-form-item>
              </div>
            </div>
            <div v-if="specListShow(index) === 0" class="specBtnBox">
              <el-button
                class="specBtn"
                type="primary"
                size="mini"
                icon="el-icon-circle-plus-outline"
                @click="addSpecbox"
              >
                新增規格</el-button>
            </div>
            <dir v-else class="specBtnBox">
              <el-button
                class="specBtn"
                type="danger"
                size="mini"
                icon="el-icon-remove-outline"
                @click="deleteSpecbox(index)"
              >
                刪除規格</el-button>
            </dir>
          </div>
        </div>
        <div v-if="specListVisiable" class="formRow all">
          <p class="rowTitle">規格表</p>
          <el-table
            :data="specTable"
            class="table-form"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item,index) in formdata.specList"
              :key="index"
              :label="item.specName"
              :prop="item.specName"
              min-width="120"
            />
            <el-table-column
              label="價格"
              prop="price"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].price" @input="saveSpecTempObject()"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="商品數量"
              prop="count"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].count" @input="saveSpecTempObject()"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="貨號"
              prop="itemNumber"
              min-width="120"
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="specTable[scope.$index].number" @input="saveSpecTempObject()"/>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="formRow all">
          <div class="uploadField">
            <div class="uploadBox">
              <p class="uploadTitle">封面圖片</p>
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="1"
                :class="{hide: hideHeadUploadBtn}"
                :auto-upload="false"
                :multiple="false"
                :file-list="headImageFileList"
                :on-change="headImageUploadChange"
                :on-preview="headImageUploadCardPreview"
                :on-remove="headImageUploadRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </div>
            <div class="uploadBox">
              <p class="uploadTitle">商品圖片</p>
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="6"
                :class="{hide: hideProdUploadBtn}"
                :auto-upload="false"
                :file-list="prodImageFileList"
                :on-change="prodUploadChange"
                :on-preview="prodUploadCardPreview"
                :on-remove="prodUploadRemove"
              >
                <i class="el-icon-plus" />
                <p slot="tip" class="el-upload__tip" />
              </el-upload>
            </div>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="formRow">
          <el-form-item label="是否上線" prop="status" class="flex">
            <el-switch
              v-model="formdata.status"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="bottomField">
      <el-button @click="$router.push('/product/productList')">取消</el-button>
      <el-button>儲存並下架</el-button>
      <el-button type="primary" @click="submitForm">儲存並上架</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ProductModule } from '@/store/modules/custom/product'
import { DialogTF, ITdialog } from './format/dialogTF'
import { SpecData, OptionData, ISpecData, SpecListShowType, IspecTableIndexData, specTableIndexData } from './format/specTable'
import { ISprodCategorySelect } from '@/api/dto/product/prodCategory/getProdCategorySelect'
import { IQcreateProduct, IProdSpec } from '@/api/dto/product/list/createProduct'
import { IQupdateProduct } from '@/api/dto/product/list/updateProduct'
import { ISgetProdcutDetail, Ispec } from '@/api/dto/product/list/getProductDetail'
import { IQuploadProdImage } from '@/api/dto/product/list/uploadProdImage'
import { getProductDetail, getProdCategorySelect, createProducts, updateProducts, uploadProductPicture } from '@/api/product'

import { FormMode } from '@/share/formType'
import { ISnoData } from '@/api/dto/common/resNoData'
import { IQid } from '@/api/dto/common/idQuery'

@Component({
  name: 'Edit'
})
export default class extends Vue {
  private formdata:ITdialog = new DialogTF()
  private categoryOptionMap:any = {}
  private categoryOption:Array<any> = []
  private firstCategoryOption:Array<any> = []
  private secondCategoryOption:Array<any> = []
  private specTable:Array<any> = []
  private recursiveTempObj:any = {}
  private dialogImageUrl = ''
  private dialogVisible = false
  private hideHeadUploadBtn = false
  private hideProdUploadBtn = false
  private headImageFileList:Array<any> = []
  private prodImageFileList:Array<any> = []
  private formMode:FormMode = FormMode.create
  private specTableTempObject:any = {}
  private specTableIndexMapArr:Array<IspecTableIndexData> = []
  mounted() {
    this.initData()
  }

  created() {
  }

  get specListVisiable():boolean {
  	return this.formdata.hasSpec === '1'
  }

  @Watch('formdata.firstCategory', { immediate: true, deep: true })
  onFirstCategoryChanged(value: string) {
    if (value) {
      this.secondCategoryOption = this.categoryOptionMap[value]
    }
  }

  @Watch('formdata.specList', { immediate: true, deep: true })
  onSpecListChanged(value:Array<ISpecData>) {
    if (value) {
      if (value[0]) {
        this.formdata.firstSpec = value[0].specName
      }
      if (value[1]) {
        this.formdata.secondSpec = value[1].specName
      }
      this.specRecursive(value)
    }
  }

  @Watch('headImageFileList', { immediate: true, deep: true })
  onHeadImageFileListChanged(value: any) {
    if (value.length >= 1) {
  		this.hideHeadUploadBtn = true
  	} else {
  		this.hideHeadUploadBtn = false
  	}
  }

  initData() {
    getProdCategorySelect().then((res:any) => {
      const resData:ISprodCategorySelect = res
      this.categoryOption = [...resData.data.content]
      this.initOption()
      this.initProductModule()
  	})
  }

  initOption() {
    this.firstCategoryOption = this.categoryOption.map(item => item.firstCategory)
    this.categoryOption.forEach(element => {
      this.categoryOptionMap[element.firstCategory] = element.secondCategory
    })
  }

  initProductModule() {
    const productId = this.$route.query.id
    if (productId) {
      this.formMode = FormMode.edit
    } else {
      this.formMode = FormMode.create
    }
    switch (this.formMode) {
      case FormMode.edit:
        getProductDetail({ id: productId.toString() }).then((res:any) => {
          const resData:ISgetProdcutDetail = res
          const {
            name, firstCategory, secondCategory, detail, firstSpec, secondSpec, hasSpec,
            price, count, number, headImage, prodImages, status, id, spec
          } = resData.data.content
          this.formdata = new DialogTF(name, firstCategory, secondCategory, detail, hasSpec.toString(),
            (firstSpec || '').toString(), (secondSpec || '').toString(), (price || '').toString(),
            (count || '').toString(), (number || '').toString(), status === 1, id, spec)
          this.saveSpecTempObject(spec)
          this.headImageFileList = [{
            name: headImage,
            url: this.getProdImage(headImage)
          }]
          const prodImgList = prodImages.split(',')
          prodImgList.forEach(element => {
            this.prodImageFileList.push({
              name: element,
              url: this.getProdImage(element)
            })
          })
        })
        break
      case FormMode.create:
        this.formdata = new DialogTF()
        break
    }
  }

  // 將specList data轉換成specTable
  specRecursive(specList:Array<ISpecData>) {
    this.specTable = []
    this.recursiveTempObj = {}
    this.specListRecursive(specList, 0)
    this.saveTempDataToTable()
  }

  private specListRecursive(specList:Array<ISpecData>, index:number) {
    if (index === specList.length) {
      this.specTable.push(Object.assign({}, this.recursiveTempObj))
      return
    }
    for (let i = 0; i < specList[index].optionList.length; i++) {
      this.recursiveTempObj[specList[index].specName] = specList[index].optionList[i].optionName
      this.specListRecursive(specList, index + 1)
    }
  }

  saveTempDataToTable() {
    this.updateSpecTableIndexMapArr()
    for (let i = 0; i < this.specTable.length; i++) {
      const specTableItem = this.specTable[i]
      if (this.specTableIndexMapArr[i]) {
        const tempData = this.specTableTempObject[this.specTableIndexMapArr[i].indexKey]
        if (tempData) {
          this.$set(specTableItem, 'price', tempData.price)
          this.$set(specTableItem, 'count', tempData.count)
          this.$set(specTableItem, 'number', tempData.number)
        }
      }
    }
  }

  updateSpecTableIndexMapArr() {
    this.specTableIndexMapArr = []
    if (this.formdata.specList[0]) {
      for (let i = 0; i < this.formdata.specList[0].optionList.length; i++) {
        if (this.formdata.specList[1]) {
          for (let j = 0; j < this.formdata.specList[1].optionList.length; j++) {
            this.specTableIndexMapArr.push(new specTableIndexData(`${i},${j}`,
              this.formdata.specList[0].optionList[i].optionName +
              ',' + this.formdata.specList[1].optionList[j].optionName))
          }
        } else {
          this.specTableIndexMapArr.push(new specTableIndexData(`${i}`,
            this.formdata.specList[0].optionList[i].optionName))
        }
      }
    }
  }

  initSpecTempObject(specTable:Array<Ispec>) {
    const curSpecTable = []
    for (let i = 0; i < this.specTableIndexMapArr.length; i++) {
      const specMapItemNameArr = this.specTableIndexMapArr[i].specName.split(',')
      const firstSpecName = specMapItemNameArr[0]
      const secondSpecName = specMapItemNameArr[1]
      for (let j = 0; j < specTable.length; j++) {
        const specTableItem = specTable[j]
        if (specTableItem.firstSpec === firstSpecName &&
          specTableItem.secondSpec === secondSpecName) {
          curSpecTable.push(specTableItem)
        }
      }
    }
    return curSpecTable
  }

  saveSpecTempObject(specTable?:Array<Ispec>) {
    this.specTableTempObject = {}
    this.updateSpecTableIndexMapArr()
    let curSpecTable = [...this.specTable]
    if (specTable) {
      curSpecTable = this.initSpecTempObject(specTable)
    }
    for (let i = 0; i < curSpecTable.length; i++) {
      const specItem = curSpecTable[i]
      if (this.specTableIndexMapArr[i]) {
        this.specTableTempObject[this.specTableIndexMapArr[i].indexKey] = {
          price: specItem.price,
          count: specItem.count,
          number: specItem.number
        }
      }
    }
  }

  optionListChange(changeTxt:string, data:any) {
    this.$set(data, 'optionName', changeTxt)
  }

  specListShow(index:number) {
    if (this.formdata.specList) {
      if (index === this.formdata.specList.length - 1 && this.formdata.specList.length === 1) { return SpecListShowType.add } else { return SpecListShowType.delete }
    }
  }

  private addSpecbox() {
  	this.formdata.specList.push(new SpecData())
  }

  private deleteSpecbox(index:any) {
  	this.formdata.specList.splice(index, 1)
  }

  private addOptionbox(parent:any) {
    parent.optionList.push(new OptionData())
  }

  private deleteOptionbox(parent:any, specIndex:number, optionIndex:number) {
    parent.optionList.splice(optionIndex, 1)
    this.fixSpecTableTempObject(specIndex, optionIndex)
  }

  private fixSpecTableTempObject(specIndex:number, optionIndex:number) {
    this.updateSpecTableIndexMapArr()
    const deleteNoUseSpec = function(_this:any) {
      for (const key in _this.specTableTempObject) {
        const keyArr = key.split(',')
        if (keyArr[specIndex] === optionIndex.toString()) {
          delete _this.specTableTempObject[key]
        }
      }
    }
    const updateSpecTableTempObject = function(_this:any) {
      const newSpecTableTempObject:any = {}
      let index = 0
      for (const key in _this.specTableTempObject) {
        newSpecTableTempObject[_this.specTableIndexMapArr[index].indexKey] = _this.specTableTempObject[key]
        index++
      }
      _this.specTableTempObject = Object.assign({}, newSpecTableTempObject)
    }
    deleteNoUseSpec(this)
    updateSpecTableTempObject(this)
  }

  private lastRemoveOptionClass(isLast:boolean) {
    if (isLast) { return 'right' } else { return '' }
  }

  getProdImage(imgName:string) {
    return process.env.VUE_APP_BASE_API + 'product/image?name=' + imgName
  }

  /* 封面圖片 */
  private headImageUploadRemove(file:any, fileList:any) {
  	this.headImageFileList = [...fileList]
  }

  private headImageUploadChange(file:any, fileList:any) {
  	this.headImageFileList = [...fileList]
  }

  private headImageUploadCardPreview(file:any) {
  	this.dialogImageUrl = file.url
  	this.dialogVisible = true
  }

  /* 產品圖片 */
  private prodUploadRemove(file:any, fileList:any) {
  	this.prodImageFileList = [...fileList]
  }

  private prodUploadChange(file:any, fileList:any) {
    this.prodImageFileList = [...fileList]
  }

  private prodUploadCardPreview(file:any) {
  	this.dialogImageUrl = file.url
  	this.dialogVisible = true
  }

  private BackToIndex(isSuccess:boolean, msg:string) {
    ProductModule.setIndexProduct({
      isSuccess,
      msg
    })
    this.$router.push({
  		path: '/product/productList'
  	})
  }

  uploadImage(file:any) {
    return new Promise<string>(resolve => {
      const formData = new FormData()
      formData.append('file', file)
      uploadProductPicture(formData).then((res:any) => {
        const resData:IQuploadProdImage = res
        resolve(resData.data.fileName)
      })
    })
  }

  private uploadImageFromData() {
    return new Promise<void>(async(resolve) => {
      /* 封面圖 */
      if (this.headImageFileList.length > 0) {
        const headImageData = this.headImageFileList[0]
        // if:新圖 else:舊圖
        if (headImageData.hasOwnProperty('raw')) {
          headImageData.name = await this.uploadImage(headImageData.raw)
        }
      }
      /* 產品圖 */
      // 用foreach會有問題
      if (this.prodImageFileList.length > 0) {
        for (let i = 0; i < this.prodImageFileList.length; i++) {
          const element = this.prodImageFileList[i]
          // if:新圖 else:舊圖
          if (element.hasOwnProperty('raw')) {
            element.name = await this.uploadImage(element.raw)
          }
        }
      }
      resolve()
    })
  }

  private getImgFileListName(fileList:Array<any>) {
    return fileList.map(item => item.name).toString()
  }

  private async submitForm() {
    const specArr:Array<IProdSpec> = []
    this.specTable.forEach(element => {
      const data:IProdSpec = {
        firstSpec: '',
        secondSpec: '',
        price: 0,
        count: 0,
        number: ''
      }
      if (element.hasOwnProperty(this.formdata.firstSpec)) {
        data.firstSpec = element[this.formdata.firstSpec]
      }
      if (element.hasOwnProperty(this.formdata.secondSpec)) {
        data.secondSpec = element[this.formdata.secondSpec]
      }
      data.price = element.price
      data.count = element.count
      data.number = element.number
      specArr.push(data)
    })
    await this.uploadImageFromData()
    switch (this.formMode) {
  	  case FormMode.create:
        const createFormData:IQcreateProduct = {
          name: this.formdata.name,
          firstCategory: this.formdata.firstCategory,
          secondCategory: this.formdata.secondCategory,
          detail: this.formdata.detail,
          hasSpec: parseInt(this.formdata.hasSpec),
          firstSpec: this.formdata.firstSpec,
          secondSpec: this.formdata.secondSpec,
          price: parseInt(this.formdata.price),
          count: parseInt(this.formdata.count),
          number: this.formdata.number,
          headImage: this.getImgFileListName(this.headImageFileList),
          prodImages: this.getImgFileListName(this.prodImageFileList),
          status: this.formdata.status ? 1 : 0,
          spec: specArr
        }
        createProducts(createFormData).then((res:any) => {
          const resData:ISnoData = res
          this.BackToIndex(resData.success, resData.msg)
        })
        break
  	  case FormMode.edit:
        const updateId:IQid = {
          id: this.formdata.id
        }
        const updateFormData:IQupdateProduct = {
          name: this.formdata.name,
          firstCategory: this.formdata.firstCategory,
          secondCategory: this.formdata.secondCategory,
          detail: this.formdata.detail,
          hasSpec: parseInt(this.formdata.hasSpec),
          firstSpec: this.formdata.firstSpec,
          secondSpec: this.formdata.secondSpec,
          price: parseInt(this.formdata.price),
          count: parseInt(this.formdata.count),
          number: this.formdata.number,
          headImage: this.getImgFileListName(this.headImageFileList),
          prodImages: this.getImgFileListName(this.prodImageFileList),
          status: this.formdata.status ? 1 : 0,
          spec: specArr
        }
        updateProducts(updateFormData, updateId).then((res:any) => {
          const resData:ISnoData = res
          this.BackToIndex(resData.success, resData.msg)
        })
        break
    }
  }
}
</script>
<style scoped lang="scss">
  .specField{
    margin-bottom: 22px;
    .specGroup{
      margin-bottom: 10px;
      .specbox{
        width: 50%;
        background-color: #00000005;
        padding: 15px;
        padding-right: 65px;
        margin-bottom: 10px;
        .specTitle{
          margin-bottom: 10px;
        }
        .optionBox{
          .el-form-item{
            margin-bottom: 10px;
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
              &.right{
                right: -25px;
              }
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
      .specBtnBox{
        width: 50%;
        padding: 0;
        display: flex;
        margin: 5px 0;
        .specBtn{
          width: 100%;
        }
      }
    }
  }
  .formRow{
    .addImg{
      .el-input__inner{
        display: none;
        border: 0!important;
        color: transparent!important;
      }
    }
  }
  ::v-deep .uploadField{
    background-color: #00000005;
    padding: 15px;
    padding-right: 40px;
    .uploadBox{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .uploadTitle{
        font-size: 14px;
        font-weight: 700;
        color: #606266;
        margin-right: 15px;
        white-space: nowrap;
      }
      .hide .el-upload.el-upload--picture-card {
        display: none!important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .specField{
      .specGroup{
        .specbox{
          width: 100%;
        }
        .specBtnBox{
          width: 100%;
        }
      }
    }
  }
</style>
