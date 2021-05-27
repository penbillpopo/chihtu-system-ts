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
    constructor(name = '', roles = '',
    	updatedAt = '', id = '') {
    	this.name = name
    	this.roles = roles
    	this.updatedAt = updatedAt
    	this.id = id
    }
}
export { IndexTF, ITindex }
