import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, getInfo } from '@/api/system'
import { IQlogin, ISlogin } from '@/api/dto/system/login'
import { ISgetInfo } from '@/api/dto/system/getInfo'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
  	this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
  	this.name = name
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
  	this.roles = roles
  }

  @Action
  public async Login(loginDto:IQlogin) {
  	const res:any = await login(loginDto)
  	const resData:ISlogin = res
  	setToken(resData.data.token)
  	this.SET_TOKEN(resData.data.token)
  }

  @Action
  public ResetToken() {
  	removeToken()
  	this.SET_TOKEN('')
  	this.SET_ROLES([])
  }

  @Action
  public async GetInfo() {
  	if (this.token === '') {
  		throw Error('GetInfo: token is undefined!')
  	}
  	const res:any = await getInfo()
  	const resData:ISgetInfo = res
  	if (!resData) {
  		throw Error('Verification failed, please Login again.')
  	}
  	const { roles, name } = resData.data
  	// roles must be a non-empty array
  	if (!roles || roles.length <= 0) {
  		throw Error('GetInfo: roles must be a non-null array!')
  	}
  	this.SET_ROLES(roles.split(','))
  	this.SET_NAME(name)
  }

  @Action
  public async ChangeRoles(role: string) {
  	// Dynamically modify permissions
  	const token = role + '-token'
  	this.SET_TOKEN(token)
  	setToken(token)
  	await this.GetInfo()
  	resetRouter()
  	// Generate dynamic accessible routes based on roles
  	PermissionModule.GenerateRoutes(this.roles)
  	// Add generated routes
  	PermissionModule.dynamicRoutes.forEach(route => {
  		router.addRoute(route)
  	})
  	// Reset visited views and cached views
  	TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
  	if (this.token === '') {
  		throw Error('LogOut: token is undefined!')
  	}
  	// await logout()
  	removeToken()
  	resetRouter()

  	// Reset visited views and cached views
  	TagsViewModule.delAllViews()
  	this.SET_TOKEN('')
  	this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
