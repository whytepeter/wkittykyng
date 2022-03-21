import Vue from 'vue'
import api from '../services/api'
import crypto from '../plugins/crypto'
import countries from '../services/countries'

export const state = () => ({
  registerForm: 'start',
  passwordForm: 'start',

  login: false,
  verify: null,

  loading: {
    all: false,
    login: false,
    register: false,
    confirmAcc: false,
    reConfirm: false,
    session: false,
    password: false,
    card: false,
    bank: false
  },

  registration: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pinId: '',
    otp: '',
    password: ''
  },
  password: {
    password: '',
    confirm_password: '',
    phoneNumber: '',
    pinId: '',
    otp: ''
  },
  user: null,
  users: null
})

export const getters = {
  getAuth (state) {
    return state.user.email === 'info@kittykyng.com'
  },
  getState: state => (payload) => {
    return state[payload]
  },
  getCountries () {
    return countries
  },
  getPassword (state) {
    return state.password
  },
  getUser (state) {
    return state.user
  },
  getAllUsers (state) {
    return state.users
  },
  getBlockedUsers (state) {
    return state.block
  },
  getLoading (state) {
    return state.loading
  },
  getAlert (state) {
    return state.alert
  },
  getLogin (state) {
    return state.login
  },
  getVerified (state) {
    return state.verified
  }

}

export const mutations = {
  // user mutation
  setState (state, payload) {
    state[payload.type] = payload.value
  },

  setLogin (state, mode) {
    state.login = mode
  },

  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  }

}

export const actions = {

  async getSessionDetails ({ commit, state, dispatch }) {
    commit('setLoading', { type: 'session', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.userSession, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const user = decryptData

      // const user = data.data
      // User Role
      Vue.$cookies.set('role', user.role.name)
      commit('setLoading', { type: 'session', is: false })

      // set User
      commit('setState', { type: 'user', value: user })
    } catch (error) {
      commit('setLoading', { type: 'session', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // async sendOtp ({ commit, state, dispatch }, payload) {
  //   commit('setLoading', { type: 'registerOtp', is: true })

  //   try {
  //     const { data } = await this.$axios.post(api.sendRegistrationOtp, payload)

  //     commit('setLoading', { type: 'registerOtp', is: false })

  //     // set the otp pinId
  //     commit('setRegistration', { type: 'pinId', value: data.pinId })
  //     dispatch('controller/initAlert', { is: true, type: 'info', message: data.message }, { root: true })

  //     // Move the user to the OTP form field
  //     commit('setState', {
  //       type: 'registerForm',
  //       value: 'Otp'
  //     })
  //   } catch (error) {
  //     commit('setLoading', { type: 'registerOtp', is: false })
  //     console.log(error)
  //     const err = error.response.data.message
  //     dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
  //   }
  // },

  async register ({ commit, state, dispatch }, payload) {
    commit('setLoading', { type: 'register', is: true })
    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.register, { cdd: encryptData })
      // const { data } = await this.$axios.post(api.register, payload)

      commit('setLoading', { type: 'register', is: false })

      // set user an access token

      const decryptData = crypto.decryptObjectData(data.data)

      Vue.$cookies.set('accessToken', decryptData)

      // Get user details
      // dispatch('getSessionDetails')
      // dispatch('controller/initAlert', { is: true, persistence:true, type: 'success', message: data }, { root: true })
      dispatch('controller/initAlert', { is: true, type: 'info', message: 'A confirmation message has been sent to your email address' }, { root: true })

      // Send User to dashboard
    } catch (error) {
      commit('setLoading', { type: 'register', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async confirmAccount ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'confirmAcc', is: true })

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(`${api.confirmAccount}/${payload}`, { cdd: encryptData })

      commit('setLoading', { type: 'confirmAcc', is: false })
      commit('setState', { type: 'verify', value: true })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      this.$router.push('/login')
    } catch (error) {
      commit('setLoading', { type: 'confirmAcc', is: false })
      commit('setState', { type: 'verify', value: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async resendConfirmation ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'reConfirm', is: true })

    try {
      const encryptData = crypto.encryptObjectData(payload)
      await this.$axios.post(api.emailConfirmation, { cdd: encryptData })

      commit('setLoading', { type: 'reConfirm', is: false })
      dispatch('controller/initAlert', { is: true, type: 'success', message: 'A confirmation mail has sent to your email address' }, { root: true })
      this.$router.push('/login')
    } catch (error) {
      commit('setLoading', { type: 'reConfirm', is: false })
      console.log(error)
      console.log(error.message)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async loginUser ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'login', is: true })

    // Clear Registration and Password Form in Local Storage
    window.localStorage.setItem('password', null)
    window.localStorage.setItem('registration', null)

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.login, { cdd: encryptData })
      // const { data } = await this.$axios.post(api.login, payload)

      commit('setLoading', { type: 'login', is: false })

      const decryptData = crypto.decryptObjectData(data.data)

      Vue.$cookies.set('accessToken', decryptData)

      // Get user details
      dispatch('getSessionDetails')
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })

      this.$router.push('/dashboard/home')
    } catch (error) {
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
      if (err === 'Confirm your email address before login') {
        dispatch('resendConfirmation', {
          email: payload.email,
          pageName: 'confirm-account',
          queryName: 'token'
        })
      }
      commit('setLoading', { type: 'login', is: false })
    }
  },

  logoutUser ({ commit }) {
    Vue.$cookies.remove('accessToken')
    this.$router.push('/login')
  },

  async forgotPassword ({ commit, state, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.forgotPassword, { cdd: encryptData }, config)

      commit('setLoading', { type: 'password', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'password', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async resetPassword ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })

    // const accessToken = Vue.$cookies.get('accessToken')
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: accessToken
    //   }
    // }

    try {
      const encryptData = crypto.encryptObjectData({ password: payload.password })

      const { data } = await this.$axios.post(`${api.resetPassword}/${payload.token}/${payload.id}`, { cdd: encryptData })

      commit('setLoading', { type: 'password', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      this.$router.push('/login')
    } catch (error) {
      commit('setLoading', { type: 'password', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async changePassword ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'password', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData({ password: payload.password })

      const { data } = await this.$axios.post(api.changePassword, { cdd: encryptData }, config)

      commit('setLoading', { type: 'password', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      this.$router.push('/login')
    } catch (error) {
      commit('setLoading', { type: 'password', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  /// ////////////////// Add and Delete Cards ////////////////////////
  async addCard ({ commit, state, dispatch }, payload) {
    try {
      commit('setLoading', { type: 'card', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.post(api.addCard, payload, config)
      commit('setLoading', { type: 'card', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      window.location.href = data.payment_url
    } catch (error) {
      commit('setLoading', { type: 'card', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async deleteCard ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: 'card', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteCard}/${payload}`, config)
      commit('setLoading', { type: 'card', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: 'card', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  /// ////////////////// Add and Delete Bank ////////////////////////
  async addBank ({ commit, state, dispatch }, payload) {
    try {
      commit('setLoading', { type: 'bank', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.post(api.addBank, payload, config)
      commit('setLoading', { type: 'bank', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'bank', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async deleteBank ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: 'bank', is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteBank}/${payload}`, config)
      commit('setLoading', { type: 'bank', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: 'bank', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async setDefault ({ commit, state, dispatch }, payload) {
    console.log(payload)
    try {
      commit('setLoading', { type: payload.type, is: true })
      const accessToken = Vue.$cookies.get('accessToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }

      const { data } = await this.$axios.delete(`${api.deleteBank}/${payload}`, config)
      commit('setLoading', { type: payload.type, is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      dispatch('getSessionDetails')
    } catch (error) {
      commit('setLoading', { type: payload.type, is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },
  handleAuth ({ dispatch }) {
    dispatch('getSessionDetails')
  }

}
