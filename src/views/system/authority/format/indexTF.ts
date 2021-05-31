interface ITindex{
    name:string
    roles:string
    updatedAt:string
    id:string
}
class IndexTF implements ITindex {
    name = ''
    roles = ''
    updatedAt = ''
    id = ''
    oriRoles =''
    constructor(name = '', roles = '',
    	updatedAt = '', id = '', oriRoles = '') {
    	this.name = name
    	this.roles = roles
    	this.updatedAt = updatedAt
    	this.id = id
      this.oriRoles = oriRoles
    }
}
export { IndexTF, ITindex }
