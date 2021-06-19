interface ITdialog{
  name:string
  secondCategory:string
  id:string
  optionList:any
}
class DialogTF implements ITdialog {
  name = ''
  secondCategory = ''
  id = ''
  optionList:any = []
  constructor(name = '', secondCategory = '', id = '') {
    this.name = name
    this.secondCategory = secondCategory
    this.id = id
    if (secondCategory !== '') {
      const categoryList = secondCategory.split(',')
      categoryList.forEach(element => {
        this.optionList.push(new OptionData(element))
      })
    } else {
      this.optionList.push(new OptionData())
    }
  }
}
class OptionData {
  optionName = ''
  constructor(optionName = '') {
    this.optionName = optionName
  }
}
export {ITdialog, DialogTF, OptionData }
