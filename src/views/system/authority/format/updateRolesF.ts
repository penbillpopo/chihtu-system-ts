
import { IQupdateRoles } from '@/api/dto/system/roles/updateRoles'
class UpdateRolesF implements IQupdateRoles {
	id = ''
	name = ''
	roles = ''
	constructor(id = '', name = '', roles = '') {
	  this.id = id
	  this.name = name
	  this.roles = roles
	}
}
export { UpdateRolesF }
