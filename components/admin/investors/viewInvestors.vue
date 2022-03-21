<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-if="investor.UserMetaData.blocked" cols="12" class="pa-0">
        <v-alert
          dense
          tile
          type="error"
          class="my-0"
        >
          <v-row align="center">
            <v-col class="grow">
              This account has been <strong>Blocked</strong>
            </v-col>
            <v-col class="shrink">
              <v-btn small outlined @click="blockUser('unblock')">
                Activate
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>

      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-toolbar flat>
          <v-toolbar-title class="text-subtitle-1 font-weight-light text-uppercase">
            {{ investor && investor.firstName }} {{ investor && investor.lastName }}
            <v-divider class="mx-2" inset vertical />
            <v-menu
              left
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                  depressed
                  color="secondary"
                  v-on="on"
                >
                  <v-icon size="20" :left="$vuetify.breakpoint.mdAndUp">
                    mdi-account-edit
                  </v-icon>
                  <span class="d-none d-md-flex"> Actions </span>
                </v-btn>
              </template>

              <v-list>
                <v-list-item dense @click="toggleDrawer(true)">
                  <v-list-item-icon>
                    <v-icon size="20" class="px-1">
                      mdi-account-edit
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Edit Account</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="investor && !investor.UserMetaData.blocked" dense @click="blockUser('block')">
                  <v-list-item-icon>
                    <v-icon size="20" class="px-1">
                      mdi-account-cancel
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Block User</v-list-item-title>
                </v-list-item>
                <v-list-item v-else dense @click="blockUser('unblock')">
                  <v-list-item-icon>
                    <v-icon size="20" class="px-1">
                      mdi-account-cancel
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Unblock User</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-title>

          <v-spacer />

          <v-btn
            small
            depressed
            left
            outlined
            color="secondary"
            class="text-capitalize mx-1"
            @click="toggle('', false)"
          >
            <v-icon small class="mr-md-2">
              mdi-close
            </v-icon>
            <span class="d-none d-md-flex"> Close</span>
          </v-btn>
        </v-toolbar>
        <v-divider />
      </v-col>
      <v-progress-linear v-if="loading.users" color="secondary" indeterminate />
      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-tabs
          v-model="tab"
          color="secondary"
          align-with-title
        >
          <v-tab
            class="text-capitalize"
            href="#profile"
          >
            Profile
          </v-tab>
          <v-tab
            class="text-capitalize"
            href="#investment"
          >
            Investments
          </v-tab>
          <v-tab
            class="text-capitalize"
            href="#withdraw"
          >
            Withdraws
          </v-tab>
          <v-tab
            class="text-capitalize"
            href="#transaction"
          >
            Transactions
          </v-tab>
        </v-tabs>
        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-tabs-items v-model="tab">
          <v-tab-item value="profile">
            <account :investor="investor" />
          </v-tab-item>
          <v-tab-item value="investment">
            <v-col cols="12">
              <investment-table :investor="investor" add :investments="investments" />
            </v-col>
          </v-tab-item>
          <v-tab-item value="withdraw">
            <v-col cols="12">
              <withdrawal-table :withdraws="withdrawals" />
            </v-col>
          </v-tab-item>
          <v-tab-item value="transaction">
            <v-col cols="12">
              <transaction-table :transactions="transactions" />
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <p-profile-details :type="'admin'" :user="investor" :drawer="drawer" :toggle="toggleDrawer" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import account from '~/components/admin/investors/account.vue'
import InvestmentTable from '~/components/investments/investmentTable.vue'
import TransactionTable from '~/components/transactions/transactionTable.vue'
import PProfileDetails from '~/components/user/pProfileDetails.vue'
import WithdrawalTable from '~/components/withdrawal/withdrawalTable.vue'
export default {
  name: 'ViewInvestor',
  components: { account, InvestmentTable, WithdrawalTable, TransactionTable, PProfileDetails },

  filters: {
    currency (val) {
      if (val) {
        return val.toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })
      } else {
      }
    }
  },
  props: ['investor', 'toggle'],
  data: () => ({
    tab: null,
    show: false,
    showBank: false,
    drawer: false
  }),
  created () {
    console.log(this.investor)
    this.$store.dispatch('admin/userInvestments', this.investor.id)
    this.$store.dispatch('admin/userTransactions', this.investor.id)
    this.$store.dispatch('admin/userWithdrawals', this.investor.id)
  },
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
    investments () {
      const investments = this.state('investment').result
      const arr = []
      investments && investments.forEach((el) => {
        el.displayPrincipal = (parseInt(el.principal)).toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })

        el.displayRoi = (parseInt(el.roi)).toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })

        el.planType = el.plan.name

        console.log(el)
        const firstName = (el.userDetails.firstName && el.userDetails.firstName).charAt(0).toUpperCase() + (el.userDetails.firstName && el.userDetails.firstName).slice(1)
        const lastName = (el.userDetails.lastName && el.userDetails.lastName).charAt(0).toUpperCase() + (el.userDetails.lastName && el.userDetails.lastName).slice(1)
        el.investor = `${firstName} ${lastName}`
        arr.push(el)
      })

      return arr
    },
    withdrawals () {
      const withdrawals = this.state('withdrawal').result
      console.log(withdrawals)

      withdrawals && withdrawals.forEach((el) => {
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

      return withdrawals
    },

    transactions () {
      const transactions = this.state('transaction').result

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
    }
  },
  methods: {
    ...mapActions({ block: 'admin/blockUser' }),
    blockUser (type) {
      const payload = {
        type,
        id: this.investor.id,
        blockReason: 'Account Blocked'
      }

      console.log(payload)
      this.block(payload)
    },
    toggleDrawer (state) {
      this.drawer = state
    },
    getDate (payload) {
      const date = new Date(payload)
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]

      return `${date.getDate()} ${
          months[date.getMonth()]
        }, ${date.getFullYear()}`
    }
  }
}
</script>

<style>

</style>
