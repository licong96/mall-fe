import fetch from 'util/fetch'

export function checkUser(username) {
  const params = {
    type: 'username',
    str: username
  }

  var url = '/user/check_valid.do'

  return fetch('POST', url, params)
}