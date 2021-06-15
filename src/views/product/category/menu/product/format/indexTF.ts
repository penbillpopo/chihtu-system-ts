interface ITindex{
    id:string
    name:string
    secondCategory:string
    updatedAt:string
}
class IndexTF implements ITindex {
    id = ''
    name = ''
    secondCategory = ''
    updatedAt = ''
    constructor(id = '', name = '',
      secondCategory = '', updatedAt = '') {
    	this.id = id
    	this.name = name
    	this.secondCategory = secondCategory
    	this.updatedAt = updatedAt
    }
}

export { IndexTF, ITindex }
