<template>
  <p-side-bar :divided="false" :loading="loading.investments" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="text-subtitle-2 primary--text">
        Wallet Balance
        <v-chip outlined small label color="secondary">
          <span v-if="user && user.wallet.main !== 0"> {{ user && user.wallet.main |currency }}</span>
          <span v-else>$0.00</span>
        </v-chip>
      </div>
    </template>
    <v-row no-gutters class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-card flat color="primary" class="mt-2">
          <v-card-text>
            <v-row no-gutters class="ma-0">
              <v-col cols="12" class="text-center">
                <v-icon color="white" large left>
                  mdi-finance
                </v-icon>
                <div class="text-subtitle-1 white--text">
                  {{ plan && plan.name }} Plan
                </div>
              </v-col>

              <v-col cols="12" class="d-flex flex-column pa-0 mb-n2 mt-2">
                <div class="d-flex align-center my-1 text-subtitle-1 text-md-h6  font-weight-medium white--text">
                  <span>
                    <span class="font-weight-light text-subtitle-2"> Min (</span>{{ plan && plan.minAmount | currency }}<span class="font-weight-light text-subtitle-2">)</span>
                  </span>
                  <v-spacer />
                  <span class="text-body-2">{{ plan && plan.duration }} Months</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-card-text class="px-0">
            <v-row no-gutters class="ma-0">
              <!-- //View Details -->
              <v-col cols="6" class="d-flex flex-column text-center">
                <div class="text-body-2 text1--text">
                  ROI
                </div>
                <div class="text3--text font-weight-medium text-subtitle-1">
                  {{ getDividend | currency }}
                </div>
              </v-col>
              <v-col cols="6" class="d-flex flex-column text-center">
                <div class="text-body-2 text1--text">
                  Interest
                </div>
                <div class="secondary--text font-weight-medium text-subtitle-1">
                  {{ plan && plan.percentage }}%
                </div>
              </v-col>

              <v-col cols="12" class="pa-2">
                <v-divider class="my-1" />
              </v-col>
              <v-col cols="12" class="px-2 mt-4">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <v-row class="ma-0">
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                        v-model="pAmount"
                        type="text"
                        name="amount"
                        outlined
                        color="secondary"
                        label="Enter Amount"
                        :rules="amountRules"
                        class="text-subtitle-2 font-weight-light rounded-md"
                      />
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <!-- <div class="text-center text-caption my-1">
                  Tap the button below to perform action.
                </div> -->
                      <v-btn
                        type="submit"
                        block
                        depressed
                        :loading="loading.investments"
                        color="secondary"
                        class="text-subtitle-2 font-weight-normal"
                      >
                        Invest Now
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PSideBar from '../../other/pSideBar.vue'
export default {
  components: { PSideBar },
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
  props: {
    plan: Object,
    drawer: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },

  data: () => ({
    valid: true,
    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    show: false,
    show2: false
  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading' }),
    getDividend () {
      const amount = this.amount === '' ? this.plan && this.plan.minAmount : this.amount
      const interest = this.plan && this.plan.percentage
      const dividend = ((amount * interest) / 100)
      return dividend
    },
    pAmount: {
      get () {
        let val = parseInt(this.amount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `₦${val}`
        }
      },
      set (val) {
        // check if the first Character is ₦ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '₦') {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.amount = val
        }
      }
    }
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert', invest: 'controller/invest' }),
    submit () {
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.pAmount.split(',').join('').slice(1))
        if (this.checkBalance(amount)) {
          if (amount < (this.plan && this.plan.minAmount)) {
            const minAmount = (parseFloat(this.plan && this.plan.minAmount)).toLocaleString('en-NG', {
              style: 'currency',
              code: 'NG',
              currency: 'NGN'
            })
            this.initAlert({
              is: true,
              type: 'error',
              persistence: true,
              message: `The minimum investible amount  ${minAmount}`
            })
            return false
          } else {
          // Create Investment object
            const payload = {
              type: this.plan.id,
              principal: amount,
              walletType: 'main'
            }
            console.log(payload)
            this.invest(payload)
          // this.clear()
          }
        }
      }
    },
    checkBalance (amount) {
      const balance = this.user && this.user.wallet.main
      // console.log(amount)
      console.log(balance)
      if (amount > balance) {
        this.initAlert({
          is: true,
          type: 'error',
          persistence: true,
          message: "You don't have enough fund to perform this transaction, Pleas fund your wallet and try again"
        })
        return false
      } else {
        return true
      }
    }

  }
}
</script>

<style>

</style>
