interface ITdialog{
    account:string
    password:string
    name:string
    roleName:string
    status:boolean
    id:string
}
class DialogTF implements ITdialog {
    account = ''
    password = ''
    name = ''
    roleName = ''
    status = true
    id = ''
    constructor(account = '', name = '',
      roleName = '', status = true, id = '') {
    	this.account = account
    	this.name = name
    	this.roleName = roleName
    	this.status = status
      this.id = id
    }
}
export { DialogTF, ITdialog }
