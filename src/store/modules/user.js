import { login, logout, getInfo, getRouter } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routerList: '',
    roles: null,
    Bool: true
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  Set_Router: (state, router) => {
    state.routerList = router
  },
  Set_Roles: (state, roles) => {
    state.roles = roles
  },
  Set_NoTxt: (state, txt) => {
    state.Bool = txt
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        account: username.trim(),
        password: password
      }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        const { username, avatar, role_name } = data
        commit('Set_Roles', role_name)
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户权限路由
  getRouter({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRouter(state.token).then(res => {
        commit('Set_Router', res.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        // location.reload()
        commit('RESET_STATE')
        Cookies.remove('router')
        localStorage.removeItem('router')
        localStorage.removeItem('todos')
        Message.success({
          message: '退出成功'
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出清空token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      resetRouter()

      localStorage.removeItem('router')
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
