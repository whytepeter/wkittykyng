<template>
  <v-container>
    <v-row class="ma-0">
      <v-col v-for="showcard in showcards" :key="showcard.name" cols="12" md="4" class="px-md-0">
        <showcard
          :name="showcard.name"
          :chip="showcard.chip"
          :to="showcard.to"
          :number="showcard.number"
          :amount="showcard.amount"
          :icon="showcard.icon"
          :loading="showcard.loading"
        />
      </v-col>
    </v-row>
    <v-row v-if="statss" class="ma-0 mt-2">
      <v-col cols="12" class="pa-0">
        <stats />
      </v-col>
      <!-- <v-col cols="12" md="4" class="pa-0">
        asdf
      </v-col> -->
    </v-row>
    <v-row class="ma-0">
      <v-col cols="12" class="px-0">
        <!-- <p-transaction :transactions="transactions" tile /> -->
        <transaction-table :transactions="transactions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Showcard from '~/components/admin/showcard.vue'
import Stats from '~/components/admin/stats.vue'
// import PTransaction from '~/components/other/pTransaction.vue'
import TransactionTable from '~/components/transactions/transactionTable.vue'
export default {
  name: 'Admin',
  components: { Showcard, Stats, TransactionTable },
  layout: 'admin',
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
        return val.toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })
      } else {
      }
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters({ state: 'admin/getState' }),
    transactions () {
      const transactions = this.state('transactions').result
      transactions && transactions.forEach((el) => {
        el.displayAmount = (parseFloat(el.amount)).toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })

        el.date = this.getDate(el.createdAt)
        const firstName = (el.user.firstName && el.user.firstName).charAt(0).toUpperCase() + (el.user.firstName && el.user.firstName).slice(1)
        const lastName = (el.user.lastName && el.user.lastName).charAt(0).toUpperCase() + (el.user.lastName && el.user.lastName).slice(1)
        el.investor = `${firstName} ${lastName}`
      })
      return transactions
    },
    showcards () {
      const users = this.state('users')
      const investments = this.state('investments').result
      const withdrawals = this.state('withdrawals').result
      console.log(withdrawals && withdrawals)
      return [
        {
          name: 'Investors',
          number: users && users.length,
          chip: users && users.length,
          to: '/admin/investors',
          icon: 'mdi-account-group',
          loading: false
        },
        {
          name: 'Investments',
          amount: this.getTotal(investments && investments, 'investments'),
          chip: investments && investments.length,
          to: '/admin/investments',
          icon: 'mdi-finance',
          loading: false
        },
        {
          name: 'Pending Withdrawals',
          amount: this.getTotal(withdrawals && withdrawals, 'withdrawals'),
          chip: withdrawals && withdrawals.length,
          to: '/admin/withdrawals',
          icon: 'mdi-cash-minus',
          loading: false
        }
      ]
    }
  },
  methods: {
    getTotal (arr, type) {
      const options = {
        investments: 'principal',
        withdrawals: 'amount'
      }

      let sum = 0

      arr && arr.forEach((el) => {
        const name = options[type]
        console.log(name)
        const amount = parseFloat(el[name])
        if (name === 'amount') {
          if ((el.status).toLowerCase() === 'pending') {
            sum += amount
          }
        } else {
          sum += amount
        }
      })

      console.log('SUM', sum)
      return sum.toString()
    },

    getDate (payload) {
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
        }, ${date.getFullYear()}; ${new Date(payload).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
    }
  }

}
</script>

<style>

</style>
