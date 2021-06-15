interface ITindex{
    id:string
    name:string
    updatedAt:string
}
class IndexTF implements ITindex {
    id = ''
    name = ''
    updatedAt = ''
    constructor(id = '', name = '', updatedAt = '') {
    	this.id = id
    	this.name = name
    	this.updatedAt = updatedAt
    }
}

export { IndexTF, ITindex }
