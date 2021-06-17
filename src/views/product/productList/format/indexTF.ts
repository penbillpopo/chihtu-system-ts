interface ITindex{
    id:string
    name:string
    headImage:string
    status:boolean
    updatedAt:string
}
class IndexTF implements ITindex {
    id = ''
    name = ''
    headImage = ''
    status = true
    updatedAt = ''
    constructor(id = '', name = '',headImage = '',status = true,
    	updatedAt = '') {
    	this.id = id
    	this.name = name
    	this.headImage = headImage
    	this.status = status
    	this.updatedAt = updatedAt
    	this.id = id
    }
}
export { IndexTF, ITindex }
