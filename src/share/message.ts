import Vue from 'vue'

enum MsgType{
    success,
    failure
}

function ResponseMsg(msgType:MsgType, msg:string) {
  let msgTypeStr = ''
  switch (msgType) {
    case MsgType.success:
      msgTypeStr = 'success'
      break
    case MsgType.failure:
      msgTypeStr = 'error'
      break
  }
  Vue.prototype.$message({
    message: msg,
    type: msgTypeStr
  })
}

export { ResponseMsg, MsgType }
