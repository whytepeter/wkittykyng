import Vue from 'vue'
import crypto from '../plugins/crypto'
import api from '../services/api'

export const state = () => ({

  activePage: 'Home',

  loading: {
    investments: false,
    transactions: false,
    withdrawals: false,
    kyc: false,
    profile: false,
    fundWallet: false
  },

  alert: {
    is: false,
    type: '',
    message: '',
    title: '',
    persistence: false
  },

  banks: [],
  codeBanks: [],
  investments: [],
  transactions: [],
  withdrawals: []

})

export const getters = {

  getState: state => (payload) => {
    return state[payload]
  },

  getAlert (state) {
    return state.alert
  },

  getActivePage (state) {
    return state.activePage
  },

  getBanks (state) {
    return state.banks
  },

  getBank: state => (code) => {
    let bank
    state.codeBanks.find((el) => {
      if (code === el.code) {
        bank = el.name
      }
    })
    return bank
  },
  getBankCode: state => (bankName) => {
    let bankCode
    state.codeBanks.find((el) => {
      if (bankName.toLowerCase() === (el.name).toLowerCase()) {
        bankCode = el.code
      }
    })

    return bankCode
  },

  getLoading (state) {
    return state.loading
  }

}

export const mutations = {
  setState (state, { type, value }) {
    state[type] = value
  },

  setActivePage (state, active) {
    state.activePage = active
  },
  setAlert (state, alert) {
    state.alert = alert
  },
  setLoading (state, { type, is }) {
    state.loading.all = is
    state.loading[type] = is
  }

}

export const actions = {
  // Alert
  initAlert ({ commit }, { is, type, timer, persistence, title, message }) {
    if (typeof persistence === 'undefined') {
      persistence = false
    }
    if (typeof timer === 'undefined') {
      timer = null
    }

    // console.log({ is, type, title, timer, persistence, message })
    commit('setAlert', { is, type, title, timer, persistence, message })
  },

  // Initialization
  async initBanks ({ commit, state }) {
    const { data } = await this.$axios.get('https://api.paystack.co/bank')
    const arr = data.data

    const banks = []
    arr.forEach((el) => {
      banks.push(el.name)
    })

    banks.push('Brass & Books')
    commit('setState', { type: 'banks', value: banks })
    commit('setState', { type: 'codeBanks', value: data.data })
  },

  // Investment
  async initInvestments ({ commit, dispatch }) {
    commit('setLoading', { type: 'investments', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.myInvestment, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const investments = decryptData
      // const investments = data.data
      commit('setLoading', { type: 'investments', is: false })

      // set User
      commit('setState', { type: 'investments', value: investments })
    } catch (error) {
      commit('setLoading', { type: 'investments', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  async invest ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'investments', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.invest, { cdd: encryptData }, config)
      // const { data } = await this.$axios.post(api.invest, payload, config)

      // const decryptData = crypto.decryptObjectData(data.data)

      // console.log(data.data)
      dispatch('initInvestments')
      dispatch('initTransactions')
      dispatch('authentication/getSessionDetails', null, { root: true })
      commit('setLoading', { type: 'investments', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'investments', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Transactions
  async initTransactions ({ commit, dispatch }) {
    commit('setLoading', { type: 'transactions', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(`${api.myTransactions}?size=30`, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const transactions = decryptData
      // const transactions = data.data
      // Sort Transactions

      transactions.result.sort((a, b) => new Date(b.date) - new Date(a.date))

      commit('setLoading', { type: 'transactions', is: false })

      // set User
      commit('setState', { type: 'transactions', value: transactions })
    } catch (error) {
      commit('setLoading', { type: 'transactions', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Withdraws
  async withdraw ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'withdrawals', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.withdrawal, { cdd: encryptData }, config)
      // const { data } = await this.$axios.post(api.invest, payload, config)

      // const decryptData = crypto.decryptObjectData(data.data)

      dispatch('initWithdrawals')
      dispatch('initTransactions')
      dispatch('authentication/getSessionDetails', null, { root: true })
      commit('setLoading', { type: 'withdrawals', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  async initWithdrawals ({ commit, dispatch }) {
    commit('setLoading', { type: 'withdrawals', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.myWithdrawal, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const withdrawals = decryptData
      // const withdrawals = data.data

      commit('setLoading', { type: 'withdrawals', is: false })

      // set User
      commit('setState', { type: 'withdrawals', value: withdrawals })
    } catch (error) {
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Fund Wallet - with card
  async fundWallet ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'fundWallet', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.fundWallet, { cdd: encryptData }, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const url = decryptData
      window.location.href = url
      commit('setLoading', { type: 'fundWallet', is: false })
    } catch (error) {
      commit('setLoading', { type: 'fundWallet', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Update Profile Details
  async updateProfile ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'profile', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.put(api.users, { cdd: encryptData }, config)

      dispatch('authentication/getSessionDetails', null, { root: true })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      commit('setLoading', { type: 'profile', is: false })
    } catch (error) {
      commit('setLoading', { type: 'profile', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },
  async updateKyc ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'kyc', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(api.kyc, { cdd: encryptData }, config)

      dispatch('authentication/getSessionDetails', null, { root: true })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      commit('setLoading', { type: 'kyc', is: false })
    } catch (error) {
      commit('setLoading', { type: 'kyc', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Initialize App
  async initApp ({ dispatch }) {
    await dispatch('admin/initPlans', null, { root: true })
    await dispatch('initTransactions')
    await dispatch('initInvestments')
    await dispatch('initWithdrawals')
    await dispatch('initBanks')
  }

}
