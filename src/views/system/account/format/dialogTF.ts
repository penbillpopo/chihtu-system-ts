interface ITdialog{
    account:string
    password:string
    name:string
    roleName:string
    status:boolean
}
class DialogTF implements ITdialog {
    account = ''
    password = ''
    name = ''
    roleName = ''
    status = true
    constructor(account = '', password = '', name = '',
    	roleName = '', status = true) {
    	this.account = account
    	this.password = password
    	this.name = name
    	this.roleName = roleName
    	this.status = status
    }
}
export { DialogTF, ITdialog }
