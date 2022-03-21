<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-divider />

        <v-row class="ma-0 white align-center">
          <v-col cols="12" sm="6" class="py-0">
            <v-toolbar flat>
              <v-toolbar-title class="d-flex align-center font-weight-light text-subtitle-1 text-uppercase">
                <v-btn
                  fab
                  small
                  outlined
                  color="primary"
                  :loading="loading.withdrawals"
                  class="ml-1"
                  @click="refresh"
                >
                  <v-icon size="20">
                    mdi-refresh
                  </v-icon>
                </v-btn>

                <v-divider class="mx-4" inset vertical />
                <span class="d-flex align-center font-weight-bold">
                  <!-- Pending -->
                  Withdrawals <v-chip class=" ml-2 text-subtitle-1 pa-4" color="primary" label>
                    {{ getTotal(withdrawals) | currency }}
                  </v-chip></span>
              </v-toolbar-title>
            </v-toolbar>
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="6" class="text-center text-sm-right pb-2 py-sm-0">
            <v-spacer />

            <v-btn
              depressed

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
                <span class=""> Export - {{ type }}</span>
              </download-excel>
            </v-btn>
          </v-col>
        </v-row>

        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <withdrawal-table :selected="selected" :withdraws="withdrawals" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import withdrawalTable from '~/components/withdrawal/withdrawalTable.vue'

export default {
  name: 'Withdrawals',
  components: { withdrawalTable },
  layout: 'admin',
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
  data: () => ({
    type: 'Excel',
    selected: []
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
    withdrawals () {
      const withdrawals = this.state('withdrawals').result
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
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('admin/initWithdrawals')
    },
    getTotal (arr) {
      let sum = 0

      arr && arr.forEach((el) => {
        if ((el.status).toLowerCase() === 'pending') {
          const amount = parseFloat(el.amount)
          sum += amount
        }
      })

      return sum
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
