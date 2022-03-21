<template>
  <div>
    <v-data-table
      :search="search"
      :loading="loading.investments"
      loading-text="Loading... Please wait"
      :headers="Head"
      :items="investments"
      sort-by="date"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-subtitle-1 d-flex align-center text-uppercase">
            <span class="d-none d-sm-block"> Investments</span>
            <v-divider class="mx-4 d-none d-sm-block" inset vertical />
            <v-chip class="ml-sm-1 ma-0" color="primary" small label outlined>
              {{ investments.length }}
            </v-chip>
            <v-divider class="mx-2 mx-sm-4" inset vertical />
            <v-btn
              v-if="add"
              :small="$vuetify.breakpoint.xsOnly"
              class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
              depressed
              color="secondary"
              @click="toggleDrawer(true)"
            >
              <v-icon size="20" :left="$vuetify.breakpoint.mdAndUp">
                mdi-plus
              </v-icon>
              <span class="d-none d-md-flex"> Add Investment </span>
            </v-btn>
          </v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          depressed
          outlined
          :color="item.status === 'ongoing'?'secondary':'success'"
          class="text-uppercase"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="secondary"
          depressed
          class="text-capitalize text-subtitle-2 font-weight-regular"
          small
          @click="goto(item.cert)"
        >
          <v-icon small :left="$vuetify.breakpoint.smAndUp" size="20">
            mdi-file-check
          </v-icon>

          <span class="d-none d-md-flex">Certificate</span>
        </v-btn>
      </template>
      <template />
    </v-data-table>
    <add-investment :drawer="drawer" :toggle="toggleDrawer" :investor="investor" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddInvestment from './addInvestment.vue'
export default {
  components: { AddInvestment },
  props: {
    add: {
      type: Boolean,
      default: false
    },
    investments: {
      type: Array,
      default: () => ([])
    },
    investor: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    drawer: false,
    search: '',
    Head: [
      {
        text: 'Investor',
        align: 'start',
        sortable: false,
        value: 'investor'
      },
      {
        text: 'Principal',
        value: 'displayPrincipal'
      },
      {
        text: 'Plan Type',
        value: 'planType'
      },

      {
        text: 'ROI',
        value: 'displayRoi'
      },
      {
        text: 'Months',
        value: 'durationInMonths'
      },
      {
        text: 'Start Date',
        value: 'startDate'
      },
      {
        text: 'Maturity Date',
        value: 'maturityDate'
      },
      {
        text: 'Status',
        value: 'status'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ]
  }),

  computed: {
    ...mapGetters({ loading: 'admin/getLoading' })
  },
  methods: {
    toggleDrawer (state) {
      this.drawer = state
      console.log(this.drawer)
    },
    goto (to) {
      window.open(to, '_blank')
    }
  }

}
</script>

<style>

</style>
