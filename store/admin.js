import Vue from 'vue'
import api from '../services/api'
import crypto from '../plugins/crypto'

export const state = () => ({

  activePage: 'Dashboard',

  loading: {
    settings: false,
    users: false,
    roles: false,
    wallet: false,
    plans: false,
    withdrawals: false,
    transactions: false,
    investments: false,
    profile: false,
    assign: false,
    errorLog: false
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

  settings: {},
  users: [],
  roles: [],
  permissions: [],
  plans: [],

  withdrawals: [],
  investments: [],
  transactions: [],

  withdrawal: [],
  investment: [],
  transaction: [],

  errorLog: []
})

export const getters = {

  getPlansByName: state => (name) => {
    const plans = []
    state.plans.forEach((el) => {
      if (el.name.toLowerCase().includes(name)) {
        plans.push(el)
      }
    })
    return plans
  },

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

  // Init Error Logs
  async errorLogs ({ commit, dispatch }) {
    commit('setLoading', { type: 'errorLog', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(`${api.errorLog}?size=50`, config)
      const decryptData = crypto.decryptObjectData(data.data)
      const errorLog = decryptData
      console.log('errorLog', errorLog)

      commit('setLoading', { type: 'errorLog', is: false })
      // set Error Log
      commit('setState', { type: 'errorLog', value: errorLog })
    } catch (error) {
      commit('setLoading', { type: 'errorLog', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async initSettings ({ commit, dispatch }) {
    commit('setLoading', { type: 'settings', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.settings, config)
      const decryptData = crypto.decryptObjectData(data.data)
      const settings = decryptData
      console.log(settings)

      commit('setLoading', { type: 'settings', is: false })
      // set User
      commit('setState', { type: 'settings', value: settings })
    } catch (error) {
      commit('setLoading', { type: 'settings', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  async updateSettings ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'settings', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.put(api.settings, { cdd: encryptData }, config)

      dispatch('initSettings')
      commit('setLoading', { type: 'settings', is: false })

      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'settings', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // Init all usrs
  async initUsers ({ commit, dispatch }) {
    commit('setLoading', { type: 'users', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.users, config)
      const decryptData = crypto.decryptObjectData(data.data)
      const users = decryptData
      console.log(users)

      commit('setLoading', { type: 'users', is: false })
      console.log(users)

      // modify users
      users.forEach((el) => {
        el.firstName = el.firstName.charAt(0).toUpperCase() + (el.firstName).slice(1)
        el.lastName = el.lastName.charAt(0).toUpperCase() + (el.lastName).slice(1)
        el.verified = el.UserMetaData.emailConfirmed
        el.date = getDate(el.createdAt)
      })
      // set User
      commit('setState', { type: 'users', value: users })
    } catch (error) {
      commit('setLoading', { type: 'users', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }

    function getDate (payload) {
      const date = new Date(payload)
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      return `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`
    }
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
      const { data } = await this.$axios.get(api.investment, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const investments = decryptData
      // const investments = data.data

      commit('setLoading', { type: 'investments', is: false })
      console.log('All investments', investments)

      // set User
      commit('setState', { type: 'investments', value: investments })
    } catch (error) {
      commit('setLoading', { type: 'investments', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  async userInvestments ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'investments', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(`${api.userInvestment}/${payload}`, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const investments = decryptData
      // const investments = data.data

      commit('setLoading', { type: 'investments', is: false })
      console.log('All investments', investments)

      // set User
      commit('setState', { type: 'investment', value: investments })
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
      const ID = payload.id
      delete payload.id
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.post(`${api.adminInvest}/${ID}`, { cdd: encryptData }, config)

      console.log(data.data)
      dispatch('initInvestments')
      dispatch('initTransactions')
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
      const { data } = await this.$axios.get(`${api.transactions}?size=50`, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const transactions = decryptData
      // const transactions = data.data

      console.log(transactions)

      // Sort Transactions
      transactions.result.sort((a, b) => new Date(b.date) - new Date(a.date))

      commit('setLoading', { type: 'transactions', is: false })
      console.log('All transactions', transactions)

      // set User
      commit('setState', { type: 'transactions', value: transactions })
    } catch (error) {
      commit('setLoading', { type: 'transactions', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  async userTransactions ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'transactions', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(`${api.userTransactions}/${payload}`, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const transactions = decryptData
      // const transactions = data.data

      commit('setLoading', { type: 'transactions', is: false })
      console.log('User transactions', transactions)

      // set User
      commit('setState', { type: 'transaction', value: transactions })
    } catch (error) {
      commit('setLoading', { type: 'transactions', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Withdrawal
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
      const { data } = await this.$axios.get(api.withdrawal, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const withdrawals = decryptData
      // const withdrawals = data.data
      console.log(withdrawals)
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log('All withdrawals', withdrawals)

      // set User
      commit('setState', { type: 'withdrawals', value: withdrawals })
    } catch (error) {
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },
  async userWithdrawals ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'withdrawals', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(`${api.userwithdrawal}/${payload}`, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const withdrawals = decryptData
      // const withdrawals = data.data

      commit('setLoading', { type: 'withdrawals', is: false })
      console.log('All withdrawals', withdrawals)

      // set User
      commit('setState', { type: 'withdrawal', value: withdrawals })
    } catch (error) {
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  async withdrawalFunction ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'withdrawals', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      let data2
      const encryptData = crypto.encryptObjectData({ withdrawals: payload.withdrawals })
      if (payload.type === 'approve') {
        const { data } = await this.$axios.post(api.approveWithdrawal, { cdd: encryptData }, config)
        data2 = data
      } else if (payload.type === 'decline') {
        const { data } = await this.$axios.post(api.declineWithdrawal, { cdd: encryptData }, config)
        data2 = data
      }

      console.log(data2)

      commit('setLoading', { type: 'withdrawals', is: false })
      dispatch('initWithdrawals')
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: 'Transaction successful' }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'withdrawals', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Roles and Permission
  async initRoles ({ commit, dispatch }) {
    commit('setLoading', { type: 'roles', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.roles, config)
      const decryptData = crypto.decryptObjectData(data.data)
      const roles = decryptData

      commit('setLoading', { type: 'roles', is: false })
      console.log(roles)

      // set User
      commit('setState', { type: 'roles', value: roles })
    } catch (error) {
      commit('setLoading', { type: 'roles', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // Create new roles
  async roleFunction ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'roles', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      let data
      if (payload.type === 'create') {
        delete payload.type
        data = { data } = await this.$axios.post(api.roles, payload, config)
      } else {
        delete payload.type
        data = { data } = await this.$axios.put(`${api.roles}/${payload.id}`, payload, config)
      }

      dispatch('initRoles')
      commit('setLoading', { type: 'roles', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'roles', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // Plans
  async initPlans ({ commit, dispatch }) {
    commit('setLoading', { type: 'plans', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const { data } = await this.$axios.get(api.plans, config)

      const decryptData = crypto.decryptObjectData(data.data)
      const plans = decryptData
      // const plans = data.data
      commit('setLoading', { type: 'plans', is: false })
      console.log(plans)

      // set Plans
      commit('setState', { type: 'plans', value: plans })
    } catch (error) {
      commit('setLoading', { type: 'plans', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // Create Plans
  async planFunction ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'plans', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      let data
      if (payload.type === 'create') {
        delete payload.type
        const encryptData = crypto.encryptObjectData(payload)
        data = { data } = await this.$axios.post(api.plans, { cdd: encryptData }, config)
      } else if (payload.type === 'edit') {
        const ID = payload.id
        delete payload.type
        delete payload.id

        const encryptData = crypto.encryptObjectData(payload)
        data = { data } = await this.$axios.put(`${api.plans}/${ID}`, { cdd: encryptData }, config)
      } else if (payload.type === 'delete') {
        const ID = payload.id
        delete payload.type
        delete payload.id
        data = { data } = await this.$axios.delete(`${api.plans}/${ID}`, config)
      }

      dispatch('controller/initAlert', { is: true, type: 'success', persistence: true, message: data.data.message }, { root: true })
      dispatch('initPlans')
      commit('setLoading', { type: 'plans', is: false })
    } catch (error) {
      commit('setLoading', { type: 'plans', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', persistence: true, message: err }, { root: true })
    }
  },

  async updateWallet ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'wallet', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const id = payload.id
      delete payload.id

      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.put(`${api.updateWallet}/${id}`, { cdd: encryptData }, config)

      dispatch('initUsers')

      commit('setLoading', { type: 'wallet', is: false })
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
    } catch (error) {
      commit('setLoading', { type: 'wallet', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, type: 'error', message: err }, { root: true })
    }
  },

  // Update User Profile Details
  async updateUserProfile ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'profile', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      const ID = payload.id
      delete payload.id
      const encryptData = crypto.encryptObjectData(payload)
      const { data } = await this.$axios.put(`${api.users}/${ID}`, { cdd: encryptData }, config)

      dispatch('initUsers')
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      commit('setLoading', { type: 'profile', is: false })
    } catch (error) {
      commit('setLoading', { type: 'profile', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Block User Account
  async blockUser ({ commit, dispatch }, payload) {
    commit('setLoading', { type: 'users', is: true })

    const accessToken = Vue.$cookies.get('accessToken')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }

    try {
      let data
      const ID = payload.id
      delete payload.id
      const encryptData = crypto.encryptObjectData(payload)
      if (payload.type === 'block') {
        delete payload.type
        data = { data } = await this.$axios.put(`${api.block}/${ID}`, { cdd: encryptData }, config)
      } else {
        delete payload.type
        data = { data } = await this.$axios.put(`${api.unblock}/${ID}`, { cdd: encryptData }, config)
      }
      data = data.data
      dispatch('initUsers')
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'success', message: data.message }, { root: true })
      commit('setLoading', { type: 'users', is: false })
    } catch (error) {
      commit('setLoading', { type: 'users', is: false })
      console.log(error)
      const err = error.response.data.message
      dispatch('controller/initAlert', { is: true, persistence: true, type: 'error', message: err }, { root: true })
    }
  },

  // Initialize App
  async initApp ({ dispatch }) {
    await dispatch('controller/initBanks', null, { root: true })
    await dispatch('initRoles')
    await dispatch('initSettings')
    await dispatch('initUsers')
    await dispatch('initInvestments')
    await dispatch('initTransactions')
    await dispatch('initWithdrawals')
    await dispatch('errorLogs')
  }
}
