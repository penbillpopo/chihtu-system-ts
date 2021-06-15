import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ICProductState {
    isSuccess:boolean
    msg:string
}

@Module({ dynamic: true, store, name: 'product' })
class CProduct extends VuexModule implements ICProductState {
    // index
    public isIndexRead = false
    public isSuccess = false
    public msg = ''

    /* Index */
    @Mutation
    private SET_INDEX_PRODUCT(payload:ICProductState) {
      this.isIndexRead = true
      this.isSuccess = payload.isSuccess
      this.msg = payload.msg
    }

    @Mutation
    private RESET_INDEX_PRODUCT() {
      this.isIndexRead = false
      this.isSuccess = false
      this.msg = ''
    }

    @Action
    public setIndexProduct(payload:ICProductState) {
      this.SET_INDEX_PRODUCT(payload)
    }

    @Action
    public resetIndexProduct() {
      this.RESET_INDEX_PRODUCT()
    }
}

export const ProductModule = getModule(CProduct)
