<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-light text-subtitle-1 text-uppercase">
            <v-btn
              fab
              small
              outlined
              color="primary"
              class="ml-1"
              @click="refresh"
            >
              <v-icon size="20">
                mdi-refresh
              </v-icon>
            </v-btn>

            <v-divider class="mx-4" inset vertical />
          </v-toolbar-title>

          <v-spacer />
          <v-btn
            depressed
            left
            color="primary"
            class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
          >
            <v-icon size="20" small :left="$vuetify.breakpoint.mdAndUp">
              mdi-file-export
            </v-icon>

            <download-excel
              header="KittyKyng  - INVESTORS"
              :data="jsonData"
              :fields="json_fields"
              worksheet="KittyKyng "
              :stringify-long-num="true"
              :type="type"
              name="KittyKyng -Investors.xls"
            >
              <span class="d-none d-md-flex"> Export - {{ type }}</span>
            </download-excel>
          </v-btn>
        </v-toolbar>
        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <transaction-table :transactions="transactions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import transactionTable from '~/components/transactions/transactionTable.vue'
export default {
  name: 'Transactions',
  components: { transactionTable },
  layout: 'admin',
  data: () => ({
    type: 'Excel'
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
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
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('admin/initTransactions')
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
