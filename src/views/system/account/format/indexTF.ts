interface ITindex{
    account:string
    name:string
    roleName:string
    status:boolean
    updatedAt:string
    id:string
    roleId:string
}
class IndexTF implements ITindex {
    account = ''
    name = ''
    roleName = ''
    status = true
    updatedAt = ''
    id = ''
    roleId = ''
    constructor(account = '', name = '',
    	roleName = '', status = true,
    	updatedAt = '', id = '', roleId = '') {
    	this.account = account
    	this.name = name
    	this.roleName = roleName
    	this.status = status
    	this.updatedAt = updatedAt
    	this.id = id
    }
}
export { IndexTF, ITindex }
