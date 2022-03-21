<template>
  <v-card tile outlined>
    <v-card-text>
      <v-row no-gutters align="start" style="width:100%">
        <v-col cols="12" md="5">
          <v-sheet class=" d-flex align-center text-subtitle-1">
            <v-tooltip top color="secondary">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  size="20"
                  :color="investor.UserMetaData.emailConfirmed ? 'success' : 'secondary'"
                  v-on="on"
                >
                  {{ investor.UserMetaData.emailConfirmed ? 'mdi-checkbox-marked-circle' : ' mdi-alert-circle' }}
                </v-icon>
              </template>
              <span>{{ investor.UserMetaData.emailConfirmed ? 'Verified' : 'Not Verified' }}</span>
            </v-tooltip>
            <span class="ml-2 text-subtitle-1 text-uppercase"> {{ `${investor && investor.firstName} ${investor && investor.lastName}` }}</span>
            <v-spacer />
            <v-chip color="primary" class="mr-md-2" small label>
              {{ investor && investor.role.name }}
            </v-chip>
          </v-sheet>
          <v-divider class="my-2" />
          <v-sheet>
            <span class="text-subtitle-2">Email:</span>
            <span class="text-subtitle-2 ml-2 font-weight-light">{{ investor && investor.email }}</span>
          </v-sheet>
          <v-divider class="my-2" />
          <v-sheet>
            <span class="text-subtitle-2">Phone Number:</span>
            <span class="text-subtitle-2 ml-2 font-weight-light">{{ investor && investor.phone }}</span>
          </v-sheet>
          <v-divider class="my-2" />
          <v-sheet class="d-flex align-center">
            <span class="primary--text text-caption">
              Bank Information
            </span>
            <v-spacer />
            <v-btn text small fab :color="showBank ? 'secondary' : 'primary'" @click="showBank = !showBank">
              <v-icon small class="font-weight-bold px-2">
                {{ showBank ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
              </v-icon>
            </v-btn>
          </v-sheet>
          <v-divider v-if="showBank" class="my-2" />
          <v-sheet v-if="showBank">
            <span class="text-subtitle-2">Bank Name</span>
            <span class="text-subtitle-2 ml-2 font-weight-light">{{ investor && investor.kyc.bank && investor.kyc.bank.bankCode ? getBank(investor.kyc.bank.bankCode) : '' }}</span>
          </v-sheet>
          <v-divider v-if="showBank" class="my-2" />
          <v-sheet v-if="showBank">
            <span class="text-subtitle-2">Accont Number:</span>
            <span class="text-subtitle-2 ml-2 font-weight-light">{{ investor && investor.kyc.bank && investor.kyc.bank.accounNumber }}</span>
          </v-sheet>
          <v-divider v-if="showBank" class="my-2" />
          <v-sheet v-if="showBank">
            <span class="text-subtitle-2">Acc Name</span>
            <span class="text-subtitle-2 ml-2 font-weight-light text-capitalize">{{ investor && investor.kyc.bank && investor.kyc.bank.accountName }}</span>
          </v-sheet>
        </v-col>
        <v-divider vertical />
        <v-col cols="12" class="d-block mb-6 mt-2 d-md-none py-2">
          <v-divider />
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column align-start ml-md-6 primary--text">
          <v-row style="width:100%" class="ma-0 ">
            <v-col cols="4" class="d-flex flex-column text-center">
              <span class="">Wallet Bal</span>
              <span class="font-weight-medium text-subtitle-2">{{ investor.wallet && investor.wallet.main | currency }}</span>
            </v-col>
            <v-col cols="4" class="d-flex flex-column text-center">
              <span class="">ROI</span>
              <span class="font-weight-medium text-subtitle-2">{{ investor.wallet && investor.wallet.roi | currency }}</span>
            </v-col>
            <v-col cols="4" class="d-flex flex-column text-center">
              <span class="">Investment</span>
              <span class="font-weight-medium text-subtitle-2">{{ investor.wallet && investor.wallet.fund | currency }}</span>
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-divider />
            </v-col>
            <v-col cols="6" class="py-0">
              <v-btn

                block
                depressed
                color="success"
                class="text-capitalize font-weight-light text-subtitle-2"
                @click="toggleDrawer(true, 'credit')"
              >
                <v-icon left size="20">
                  mdi-plus
                </v-icon>
                <span>Credit</span>
              </v-btn>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-btn

                block
                depressed
                color="error"
                class="text-capitalize font-weight-light text-subtitle-2"
                @click="toggleDrawer(true, 'debit')"
              >
                <v-icon left size="20">
                  mdi-minus
                </v-icon>
                <span>Debit</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <update-wallet :drawer="drawer" :user="investor" :type="type" :toggle="toggleDrawer" />
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import updateWallet from './updateWallet.vue'
export default {
  components: { updateWallet },

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
  props: {
    investor: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    showBank: false,
    drawer: false,
    type: ''
  }),

  created () {
    // console.log(this.investor)
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser', getBank: 'controller/getBank' })
  },
  methods: {
    toggleDrawer (state, type) {
      this.drawer = state
      this.type = type

      // console.log({ state, type })
    }

  }
}
</script>

<style>

</style>
