<template>
  <p-side-bar :loading="loading.withdrawals" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          Withdraw
        </span>
        <!-- <span class="text-caption">
          Wallet Balance: <strong>{{ walletBal | currency }}</strong>
        </span> -->
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row v-if="!showBank" no-gutters class="ma-0 my-2">
        <v-col cols="12" class="px-0 text3--text text-subtitle-1 text-capitalize">
          Withdraw from <strong>{{ wallet }} Wallet {{ walletBal | currency }}</strong>
        </v-col>
        <v-col cols="12" class="px-0 mt-2">
          <v-select
            v-model="wallet"
            :items="['Main', 'ROI']"
            value="Main"
            label="Choose Wallet"
            outlined
            class="text-subtitle-2 font-weight-light"
            return-object
            single-line
          />
        </v-col>
        <v-col cols="12" class="px-0 mb-2">
          <v-text-field
            v-model="pAmount"
            type="text"
            name="amount"
            outlined
            color="secondary"
            label="Amount"
            :rules="amountRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="px-0  text3--text">
          Your funds will be sent to the account detials below
        </v-col>
        <v-col v-if="myBank !== null" cols="12" class="pa-0   text3--text">
          <p-bank
            :id="myBank && myBank.bankCode"
            :key="myBank && myBank.bankCode"
            :name="myBank && myBank.accountName"
            :bank="myBank && myBank.name"
            :acc-number="myBank && myBank.accounNumber"
            default-bank
          />
        </v-col>
        <v-col v-else cols="12" class="pa-0 my-4 text-subtitle-1 text3--text">
          You've not added any bank accounts, <a style="text-decoration:underline" class="secondary--text font-weight-medium" @click="showBank = true">
            click here
          </a> to add
        </v-col>
        <v-col cols="12" class="pa-0 mt-n2">
          <v-btn
            :disabled="!myBank"
            large
            block
            type="submit"
            :loading="loading.withdrawals"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            Proceed
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else class="ma-0">
        <v-col cols="12" class="pa-0 mt-2">
          <v-btn small text class="text-subtitle-2 font-weight-medium" color="secondary" @click="showBank = false">
            <v-icon size="20" left>
              mdi-arrow-left
            </v-icon>
            <span>Close</span>
          </v-btn>
        </v-col>
        <add-bank />
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import pSideBar from '../other/pSideBar.vue'
import AddBank from './cardAndBank/addBank.vue'
import PBank from './cardAndBank/pBank.vue'

export default {
  name: 'PFundWallet',
  components: { pSideBar, AddBank, PBank },
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
    drawer: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },
  data: () => ({
    show: false,
    valid: false,
    isBank: false,
    showBank: false,
    wallet: 'Main',
    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    password: '',
    passwordRules: [v => !!v || 'Password is required']
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', getBank: 'controller/getBank' }),

    walletBal () {
      const obj = {
        main: this.user && this.user.wallet.main,
        roi: this.user && this.user.wallet.roi
      }

      return obj[(this.wallet).toLowerCase()]
    },
    myBank () {
      const bank = this.user && this.user.kyc.bank
      if (bank !== null) {
        bank.name = this.getBank(bank && bank.bankCode)
      }
      console.log(bank)
      return bank
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
    ...mapActions({ withdraw: 'controller/withdraw' }),

    submit () {
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.pAmount.split(',').join('').slice(1))
        const payload = {
          amount: (amount).toString(),
          walletType: (this.wallet).toLowerCase()
        }
        console.log(payload)
        this.withdraw(payload)
        // this.checkIfDone()
      }
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },
    to (to) {
      this.$router.push(to)
    }
  }

}
</script>

<style>

</style>
