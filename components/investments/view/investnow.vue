<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pb-1">
      <v-btn text tile color="secondary" class="pa-0" @click="toggle(false)">
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Go Back
      </v-btn>
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-divider />
    </v-col>
    <v-col v-if="!showPayment" cols="12">
      <v-row no-gutters class="ma-0">
        <v-col cols="8" class="pa-0 mb-2 d-flex flex-column">
          Enter Amount to Invest
          <span class="text-left text-caption ">
            ( Min Amount: ₦5,300,000.00)
          </span>
        </v-col>
        <v-col cols="4" class="pa-0 mb-2 d-flex flex-column">
          <span class="text-caption">
            Interest / Annum
          </span>
          <span class="success--text font-weight-medium text-h6 text-sm-subtitle-1 mt-n1">
            48%
          </span>
        </v-col>
        <v-col cols="12" class="pa-0">
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
        <v-col cols="8" class="pa-0 mb-2 d-flex flex-column">
          Dividen Payout
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-select
            v-model="payoutFrequency"
            :items="['Monthly','Quarterly', 'Biannually', 'Annually']"
            label="Payout Frequency"
            outlined
            color="secondary"
            class="text-subtitle-2 font-weight-light"
            single-line
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn
            type="submit"
            block
            depressed
            large
            color="secondary"
            class="text-subtitle-2 font-weight-light "
            @click="showPayment = true"
          >
            Make Payment of ({{ amount | currency }})
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else>
      <v-row no-gutters class="ma-0">
        <v-col cols="12" class="my-2">
          <span class="text-subtitle-1 font-weight-medium ">Select Payment Method</span>
        </v-col>
        <v-col v-for="(method, i) in methods" :key="i" cols="12" class="px-0 my-3">
          <p-icon-card
            outline
            :styles="'py-4'"
            :icon="method.icon"
            :title="method.title"
            :action="method.action"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PIconCard from '~/components/other/pIconCard.vue'
export default {
  components: { PIconCard },
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
    toggle: Function
  },
  data () {
    return {
      showPayment: false,
      amount: '',
      amountRules: [v => !!v || 'Amount is required'],
      payoutFrequency: 'Monthly'

    }
  },
  computed: {
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
    },

    methods () {
      return [
        {
          title: 'Pay from Wallet (₦1,000,000.00)',
          icon: 'mdi-wallet',
          action () {
            alert('Pay from Wallet')
          }
        },
        {
          title: 'Pay with Credit Card',
          icon: 'mdi-credit-card',
          action () {
            alert('Pay with Card')
          }
        }
      ]
    }
  }

}
</script>

<style>

</style>
