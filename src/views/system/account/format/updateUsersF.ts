
import { IQupdateUsers } from '@/api/dto/system/users/updateUsers'
class UpdateUsersF implements IQupdateUsers {
	id = ''
	account = ''
	name = ''
	roleId = ''
	status = ''
	constructor(id = '', account = '', name = '', roleId = '', status = '') {
	  this.id = id
	  this.account = account
	  this.name = name
	  this.roleId = roleId
	  this.status = status
	}
}
export { UpdateUsersF }
