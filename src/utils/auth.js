export function getToken () {
  if (localStorage.getItem('vuex')) {
    return JSON.parse(localStorage.getItem('vuex')).token
  }
  return ''
}
