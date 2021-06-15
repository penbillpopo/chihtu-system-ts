interface ITdialog{
  name:string
  id:string
}
class DialogTF implements ITdialog {
  name = ''
  id = ''
  constructor(name = '', id = '') {
    this.name = name
    this.id = id
  }
}
export { DialogTF, ITdialog }
