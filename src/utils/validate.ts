function CheckPassword(pw: string) {
  var num = pw.search(/[0-9]/g)
  var eng = pw.search(/[a-z]/gi)
  var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
  if (pw.length < 8) {
    return 'error-length'
  }
  if (num < 0 || eng < 0 || spe < 0) {
    return 'error-spe'
  } else {
    return true
  }
}
function verifyEmail(emailVal: string) {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  if (emailVal.match(regExp) != null) {
    return true
  } else {
    return false
  }
}

function verifyPhoneNumber(pNum: string) {
  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  if (regPhone.test(pNum) === true) {
    return true
  } else {
    return false
  }
}

function verifyName(value: string) {
  const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
export { CheckPassword, verifyEmail, verifyPhoneNumber, verifyName }
