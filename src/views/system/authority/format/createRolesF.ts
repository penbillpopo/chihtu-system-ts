
import { IQcreateRoles } from '@/api/dto/system/roles/createRoles'
class CreateRolesF implements IQcreateRoles {
	name = ''
	roles = ''
	constructor(name = '', roles = '') {
	  this.name = name
	  this.roles = roles
	}
}
export { CreateRolesF }
