interface ITdialog{
    name:string
    roles:string[]
}
class DialogTF implements ITdialog {
    name = ''
    roles:string[] = []
    constructor(name = '', roles:string[] = []) {
    	this.name = name
    	this.roles = roles
    }
}
export { DialogTF, ITdialog }
