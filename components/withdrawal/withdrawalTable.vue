<template>
  <div>
    <v-data-table
      v-model="selected"
      :search="search"
      :loading="loading.withdrawals"
      item-key="id"
      loading-text="Loading... Please wait"
      :headers="Head"
      :items="withdraws"
      sort-by="date"
      show-select
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="text-subtitle-1 d-flex align-center text-uppercase">
            Withdrawal Requests <v-chip class="ml-1" color="primary" small label outlined>
              {{ withdraws.length }}
            </v-chip>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-btn

            depressed
            color="success"
            class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
            @click="toggleApprove(true)"
          >
            <v-icon size="20" small :left="$vuetify.breakpoint.mdAndUp">
              mdi-cash-minus
            </v-icon>
            <span class=""> Approve ({{ selected.length }})</span>
          </v-btn>
          <v-btn

            depressed
            color="error"
            class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
            @click="toggleDecline(true)"
          >
            <v-icon size="20" small :left="$vuetify.breakpoint.mdAndUp">
              mdi-cash-minus
            </v-icon>
            <span class=""> Decline ({{ selected.length }})</span>
          </v-btn>
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
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          :color="getColor(item.status)"
          class="text-uppercase"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <!-- <template v-slot:item.actions="{ item }">
        <v-spacer />
        <v-btn
          :disabled="item && (item.status).toLowerCase() !== 'pending'"
          color="success"
          depressed
          class="font-weight-light text-subtitle-2"
          small
          @click="toggleApprove(true, item)"
        >
          Approve
        </v-btn>
        <v-btn
          :disabled="item && (item.status).toLowerCase() !== 'pending'"
          color="error"
          depressed
          class="font-weight-light text-subtitle-2"
          small
          @click="toggleDecline(true, item)"
        >
          Decline
        </v-btn>
      </template> -->
    </v-data-table>
    <p-modal
      :icon="'mdi-credit-card-plus'"
      :dialog="dialog.approve"
      :action="approve"
      :toggle="toggleApprove"
      :title="'Approve Withdrawal'"
      color="success"
      :loading="loading.withdrawals"
      :description="``"
    />
    <p-modal
      :icon="'mdi-credit-card-plus'"
      :dialog="dialog.decline"
      :action="decline"
      :toggle="toggleDecline"
      title="Decline Withdraw"
      color="error"
      :loading="loading.withdrawals"
      :description="description"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pModal from '../other/pModal.vue'
export default {

  components: { pModal },

  props: {
    withdraws: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({
    selected: [],
    dialog: {
      approve: false,
      decline: false
    },
    title: '',
    description: '',
    color: 'primary',
    search: '',
    Head: [
      {
        text: 'Investor',
        align: 'start',
        sortable: false,
        value: 'investor'
      },
      {
        text: 'Amount',
        value: 'displayAmount'
      },
      {
        text: 'Wallet',
        value: 'userWalletType'
      },
      {
        text: 'Date',
        value: 'date'
      },
      {
        text: 'Status',
        value: 'status'
      }

      // {
      //   text: 'Actions',
      //   value: 'actions',
      //   sortable: false
      // }
    ]
  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'admin/getLoading' })

  },

  methods: {
    ...mapActions({ withdrawalFunction: 'admin/withdrawalFunction', initAlert: 'controller/initAlert' }),
    approve () {
      const withdrawals = []
      this.selected.forEach((el) => {
        withdrawals.push(el.id)
      })
      let payload
      if (withdrawals.length) {
        payload = {
          withdrawals,
          type: 'approve'
        }
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: 'error',
          message: 'Please select at least one Withdrawal Request'
        })
      }
      console.log(payload)
      this.withdrawalFunction(payload)
    },

    decline () {
      const withdrawals = []
      this.selected.forEach((el) => {
        withdrawals.push(el.id)
      })

      let payload
      if (withdrawals.length) {
        payload = {
          withdrawals,
          type: 'decline'
        }
      } else {
        this.initAlert({
          is: true,
          persistence: true,
          type: 'error',
          message: 'Please select at least one Withdrawal Request'
        })
      }
      console.log(payload)

      this.withdrawalFunction(payload)
    },

    toggleApprove (state) {
      this.dialog.approve = state
      // if (state) {
      //   this.description = `Approve withdrawal of ${(item && item.amount).toLocaleString('en-NG', {
      //   style: 'currency',
      //     code: 'NG',
      //     currency: 'NGN'
      //   })}`
      // }
    },
    toggleDecline (state) {
      this.dialog.decline = state
      // if (state) {
      //   this.description = `Decline withdrawal of ${(item && item.amount).toLocaleString('en-NG', {
      //   style: 'currency',
      //     code: 'NG',
      //     currency: 'NGN'
      //   })}`
      // }
    },

    getColor (state) {
      state = state.toLowerCase()
      const colors = {
        pending: 'secondary',
        approved: 'success',
        rejected: 'error'
      }
      return colors[state]
    },

    checkIfDone () {
      setInterval(() => {
        if (!this.loading.withdrawals) {
          setTimeout(() => {
            this.dialog.approve = false
            this.dialog.decline = false
          }, 2000)
        }
      }, 1000)
    }

  }

}
</script>

<style>
</style>
