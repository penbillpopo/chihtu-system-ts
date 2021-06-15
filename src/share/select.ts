interface Iselect{
	id:string
	name:string
}
function findSelectIdByName(arr:Iselect[], name:string) {
  console.log(arr, name)
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    if (element.name === name) {
      return element.id
    }
  }
  return ''
}
function findSelectNameById(arr:Iselect[], id:string) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
    if (element.id === id) {
      return element.name
    }
  }
}

export { Iselect, findSelectIdByName, findSelectNameById }
