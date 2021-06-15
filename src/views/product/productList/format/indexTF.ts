interface ITindex{
    id:string
    name:string
    status:boolean
    updatedAt:string
}
class IndexTF implements ITindex {
    id = ''
    name = ''
    status = true
    updatedAt = ''
    constructor(id = '', name = '',status = true,
    	updatedAt = '') {
    	this.id = id
    	this.name = name
    	this.status = status
    	this.updatedAt = updatedAt
    	this.id = id
    }
}
export { IndexTF, ITindex }
