// 文件包含token,localStroage存取等方法
import Cookie from 'js-cookie'

const userToken = 'userToken'

export function setToken(token) {
    localStorage.setItem(userToken, token)
    Cookie.set(userToken, token)
}

export function removerToken() {
    Cookie.remove(userToken)
    localStorage.removeItem(userToken)
}

export function getToken() {
    return localStorage.getItem(userToken)
}
