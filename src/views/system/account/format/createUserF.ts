
import { IQcreateUsers } from '@/api/dto/system/createUsers'
class CreateUsersF implements IQcreateUsers {
	account = ''
	password = ''
	name = ''
	roleId = ''
	status = ''
	constructor(account = '', password = '',
	  name = '', roleId = '', status = '') {
	  this.account = account
	  this.password = password
	  this.name = name
	  this.roleId = roleId
	  this.status = status
	}
}
export { CreateUsersF }
