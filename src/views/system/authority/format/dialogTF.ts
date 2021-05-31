interface ITdialog{
    id:string
    name:string
    roles:string[]
}
class DialogTF implements ITdialog {
    id = ''
    name = ''
    roles:string[] = []
    constructor(name = '', roles:string[] = [], id = '') {
      this.name = name
    	this.roles = roles
      this.id = id
    }
}
export { DialogTF, ITdialog }
