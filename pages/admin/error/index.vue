<template>
  <v-container>
    <v-row class="ma-0">
      <v-col cols="12">
        <v-data-table
          :search="search"
          :loading="loading.errorLog"
          loading-text="Loading... Please wait"
          :headers="Head"
          :items="errorLog"
          sort-by="date"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title class="text-subtitle-1 text-uppercase d-flex align-center">
                Error Log <v-chip class="ml-2" color="error" small label outlined>
                  {{ errorLog.length }}
                </v-chip>
              </v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
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
          <template v-slot:item.statusCode="{ item }">
            <v-chip
              small
              depressed
              outlined
              color="error"
              class="text-uppercase"
            >
              {{ item.statusCode }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  data: () => ({
    search: '',
    Head: [
      {
        text: 'End Point',
        align: 'start',
        sortable: false,
        value: 'endpoint'
      },
      {
        text: 'Error',
        value: 'errorCode'
      },
      {
        text: 'Status Code',
        value: 'statusCode'
      },
      {
        text: 'Date',
        value: 'date'
      }
    ]
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
    errorLog () {
      const errorLog = this.state('errorLog').result

      errorLog && errorLog.forEach((el) => {
        el.errorCode = el.error.error
        el.statusCode = el.error.statusCode
        el.date = this.getDate(el.timeDate)
      })
      console.log(errorLog)
      return errorLog
    }
  },
  methods: {
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
