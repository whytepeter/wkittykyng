<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-toolbar flat>
          <v-toolbar-title class="d-flex align-center font-weight-light text-subtitle-1 text-uppercase">
            <v-btn
              fab
              small
              outlined
              color="primary"
              :loading="loading.investments"
              class="ml-1"
              @click="refresh"
            >
              <v-icon size="20">
                mdi-refresh
              </v-icon>
            </v-btn>

            <v-divider class="mx-4" inset vertical />
            <span class="d-flex align-center font-weight-bold">Investments <v-chip class=" ml-2 text-subtitle-1 pa-4" color="primary" label>
              {{ getTotal(investments) | currency }}
            </v-chip></span>
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
              header="KittyKyng  - INVESTMENTS"
              :data="jsonData"
              :fields="json_fields"
              worksheet="KittyKyng "
              :stringify-long-num="true"
              :type="type"
              name="KittyKyng -Investments.xls"
            >
              <span class="d-none d-md-flex"> Export - {{ type }}</span>
            </download-excel>
          </v-btn>
        </v-toolbar>
        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <investment-table :investments="investments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import investmentTable from '~/components/investments/investmentTable.vue'
export default {
  name: 'Investments',
  components: { investmentTable },
  layout: 'admin',
  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
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
    json_fields: {
      Investor: 'investor',
      Principal: 'principal',
      ROI: 'roi',
      'Investment Plan': 'plan',
      Months: 'month',
      'Effective Date': 'start',
      'Maturity Date': 'end',
      Status: 'status'

    },
    json_meta: [
      [
        {
          key: 'charset',
          value: 'utf-8'
        }
      ]
    ]
  }),
  computed: {
    ...mapGetters({ state: 'admin/getState', loading: 'admin/getLoading' }),
    investments () {
      const investments = this.state('investments').result
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

    jsonData () {
      const excelData = []

      this.investments.forEach((el) => {
        const data = {
          investor: el.firstName,
          principal: el.displayPrincipal,
          roi: el.displayRoi,
          plan: el.planType,
          month: el.durationInMonths,
          start: el.startDate,
          end: el.maturityDate,
          status: el.status
        }
        excelData.push(data)
      })

      return excelData
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('admin/initInvestments')
    },

    getTotal (arr) {
      // const options = {
      //   investments:principal,
      //   withdrawals: amount
      // }

      let sum = 0

      arr.forEach((el) => {
        const principal = parseFloat(el.principal)
        sum += principal
      })

      return sum
    }
  }

}
</script>

<style>

</style>
