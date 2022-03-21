<template>
  <p-side-bar :loading="loading" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span>
          Autosave Settings
        </span>
      </div>
    </template>
    <v-row class="ma-0">
      <v-col cols="12" class="d-flex">
        <span class="text-caption text1--text">
          Automate your saving with AutoSave. Control how you want to save into your BBMPCS wallet.
        </span>
        <v-spacer />
      </v-col>
      <v-col cols="10" class="py-0">
        <v-select
          v-model="power"
          :items="['OFF','ON']"
          outlined
          dense
          color="secondary"
          class="text-subtitle-2 font-weight-light"
          single-line
        />
      </v-col>
      <v-col cols="2" class="py-0 pl-0">
        <v-btn
          depressed
          class="py-5"
          :color="power === 'ON' ? 'secondary' : 'grey grey--text lighten-2 text--lighten-1'"
          @click="power === 'OFF' ? power = 'ON' : power = 'OFF'"
        >
          <v-icon dark>
            {{ power === 'ON' ? ' mdi-power-standby' : ' mdi-power-off' }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          v-model="product"
          :items="items"
          outlined
          dense
          color="secondary"
          class="text-subtitle-2 font-weight-light"
          single-line
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="pAmount"
          type="text"
          name="amount"
          outlined
          dense
          color="secondary"
          label="Amount"
          :rules="amountRules"
          class="text-subtitle-2 font-weight-light rounded-md"
        />
      </v-col>
      <v-col cols="12" class="pt-0 text3--text">
        <div>
          How will you prefer to save?
        </div>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          v-model="interval"
          :items="['Daily','Weekly', 'Monthly']"
          outlined
          dense
          label="How will you prefer to save?"
          color="secondary"
          class="text-subtitle-2 font-weight-light"
          single-line
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="date"
          type="text"
          name="date"
          outlined
          dense
          color="secondary"
          label="Preferred Time"
          :rules="dateRules"
          class="text-subtitle-2 font-weight-light rounded-md"
        />
      </v-col>
      <v-col cols="12" class="pt-0 text3--text">
        <div>
          When do you want to start?
        </div>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-select
          v-model="start"
          :items="['Start Now','Tomorrow', ]"
          outlined
          dense
          color="secondary"

          class="text-subtitle-2 font-weight-light"
          single-line
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-btn
          block
          depressed
          color="secondary"
          class="text-subtitle-2 font-weight-normal"
          @click="next = true"
        >
          Save Settings
        </v-btn>
      </v-col>
    </v-row>
  </p-side-bar>
</template>

<script>
import PSideBar from '../pSideBar.vue'
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
    drawer: {
      type: Boolean,
      default: false
    },
    type: {
      type: [String, Number]
    },
    toggle: Function
  },

  data: () => ({
    power: 'OFF',
    amount: '',
    product: '',
    interval: 'Daily',
    items: ['Daily Savings', 'Daily Micro Savings'],
    date: '',
    start: 'Start Now'
  }),
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
    }
  },
  created () {
    this.product = this.items[this.type]
  },
  methods: {
    submit () {
      console.log(this.amount)
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    }
  }
}
</script>

<style>

</style>
