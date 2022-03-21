
<template>
  <v-container fluid class="grey lighten-3">
    <v-row v-if="!view" justify="center">
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
              :loading="loading.users"
              @click="refresh"
            >
              <v-icon size="20">
                mdi-refresh
              </v-icon>
            </v-btn>
            <v-btn
              fab
              small
              depressed
              color="primary"
              class="ml-1"
            >
              <v-icon size="20">
                mdi-bell
              </v-icon>
            </v-btn>

            <v-divider class="mx-4" inset vertical />
          </v-toolbar-title>

          <v-spacer />

          <v-btn class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular" depressed color="secondary" @click="toggleAdd(true)">
            <v-icon size="20" :left="$vuetify.breakpoint.mdAndUp">
              mdi-plus
            </v-icon>
            <span class="d-none d-md-flex"> Add Investor </span>
          </v-btn>
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
        <v-data-table
          :search="search"
          loading-text="Loading... Please wait"
          :loading="loading.users"
          :headers="headers"
          :items="investors"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-subtitle-1 d-flex align-center">
                INVESTORS
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-chip class="ml-1" color="primary" label outlined small>
                {{ investors.length }}
              </v-chip>

              <v-spacer />
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
              <!-- <v-spacer></v-spacer>
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Investment</v-btn> -->
            </v-toolbar>
          </template>

          <template v-slot:item.verified="{ item }">
            <v-chip
              :color="item.verified ? 'success' : 'secondary'"
              outlined
              small
              label
            >
              {{ item.verified ? 'Verified' : 'Not Verified' }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              color="primary"
              outlined
              small
              @click="openView(item, true)"
            >
              view
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <view-investors v-else :investor="investor" :toggle="toggleView" />
    <add-investor :drawer="drawer" :toggle="toggleAdd" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddInvestor from '~/components/admin/investors/addInvestor.vue'
import viewInvestors from '~/components/admin/investors/viewInvestors.vue'

export default {
  name: 'Investors',
  components: { viewInvestors, AddInvestor },
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
    drawer: false,
    view: false,
    type: 'csv',
    investor: '',
    search: '',
    headers: [
      {
        text: 'First Name',
        align: 'start',
        sortable: false,
        value: 'firstName'
      },
      {
        text: 'Last Name',
        value: 'lastName'
      },

      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Phone Number',
        value: 'phone'
      },
      // {
      //   text: 'Investments',
      //   value: 'investments'
      // },
      {
        text: 'Join Date',
        value: 'date'
      },
      {
        text: 'Account',
        value: 'verified'
      },

      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    json_fields: {
      'First Name': 'firstName',
      'Last Name': 'lastName',
      Email: 'email',
      'Phone Number': 'phoneNumber',
      Gender: 'gender',
      'Join Date': 'CreatedDate',
      'Main Walet': 'main',
      'ROI Wallet': 'roi',
      'Date Of Birth': 'dob',
      Country: 'country',
      Address: 'address'
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
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),

    investors () {
      return this.state('users')
    },

    jsonData () {
      const excelData = []

      this.investors.forEach((el) => {
        const data = {
          firstName: el.firstName,
          lastName: el.lastName,
          email: el.email,
          phoneNumber: (el.phone).toString(),
          gender: el.kyc.gender,
          main: el.wallet.main,
          roi: el.wallet.roi,
          CreatedDate: this.getDate(el.createdAt),
          verified: el.verified,
          dob: el.kyc.dob,
          country: el.kyc.country,
          address: el.kyc.address
        }
        excelData.push(data)
      })

      return excelData
    }

  },

  methods: {

    refresh () {
      this.$store.dispatch('admin/initUsers')
    },

    getColor (status) {
      if (status.toLowerCase() === 'completed') {
        return 'success'
      } else if (status.toLowerCase() === 'on-going') {
        return 'accent'
      }
    },

    openView (investor, state) {
      this.investor = investor
      this.view = state
      console.log(investor)
    },

    toggleView (state) {
      this.view = state
    },
    toggleAdd (state) {
      this.drawer = state
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
        }, ${date.getFullYear()}`
    }
  },
  head () {
    return {
      title: 'Investors',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work

      ]

    }
  }

}
</script>

<style>

</style>
