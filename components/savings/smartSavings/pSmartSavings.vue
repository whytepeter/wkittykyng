<template>
  <v-container class="pa-0">
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10" lg="9" class="">
        <v-card outlined class="rounded-lg">
          <v-card-text>
            <v-row no-gutters class="ma-0">
              <v-col cols="12" sm="8" lg="9" class="d-flex align-center">
                <v-icon color="secondary" large left>
                  mdi-bullseye-arrow
                </v-icon>
                <div class="d-flex flex-column ml-sm-4">
                  <span class="text-capitalize text-subtitle-1 font-weight-medium">
                    My Balance
                  </span>
                  <span class="secondary--text text-h5 text-sm-h4 font-weight-bold">{{ smartSavings | currency }}</span>
                  <div class="mt-1">
                    <span class="text3--text text-subtitle-1">4%</span>
                    <span class="text-body-2 ">Interest in 6 months</span>
                  </div>
                </div>
              </v-col>
              <v-col cold="12" sm="4" lg="3" class="mt-2">
                <v-btn block depressed color="secondary" class="text-subtitle-2 font-weight-normal" @click="toggle.smartsavings(true)">
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  New Target
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="10" lg="9" class="py-0">
        <span class="text-subtitle-2">
          My Targeted Savings
        </span>
      </v-col>
      <v-col
        v-for="(saving, i) in savings"
        :key="i"
        cols="12"
        md="10"
        lg="9"
        class="py-0 mt-4"
        @click="open(saving)"
      >
        <p-smart-savings-card class="cursor" :name="saving.name" :date="saving.date" :amount-saved="saving.amountSaved" :target-amount="saving.targetAmount" />
      </v-col>
    </v-row>
    <p-view-smart-savings :details="savingsDetails" :drawer="drawer.savings" :toggle="toggle.savings" />
    <p-new-target :drawer="drawer.smartsavings" :toggle="toggle.smartsavings" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PViewSmartSavings from './pViewSmartSavings.vue'
import PSmartSavingsCard from './pSmartSavingsCard.vue'
import PNewTarget from './pNewTarget.vue'
export default {
  components: { PSmartSavingsCard, PViewSmartSavings, PNewTarget },
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
    drawer: {
      savings: false,
      new: false,
      smartsavings: false
    },
    savingsDetails: null
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    smartSavings () {
      return this.user && this.user.SmartSavingsWallet.balance
    },

    savings () {
      return [
        {
          name: 'New Phone',
          targetAmount: 76000,
          amountSaved: 9500,
          interest: 240,
          date: '5 days in 6 months'
        },
        {
          name: 'New Laptop',
          targetAmount: 200000,
          amountSaved: 90000,
          interest: 300,
          date: '5 days in 6 months'
        },
        {
          name: 'Goofer',
          targetAmount: 5000000,
          amountSaved: 107000,
          interest: 1900,
          date: '5 days in 6 months'
        }
      ]
    },

    toggle () {
      return {
        savings: (state) => {
          this.drawer.savings = state
          if (state === false) {
            this.savingsDetails = null
          }
        },
        new: (state) => {
          this.drawer.new = state
        },
        smartsavings: (state) => {
          this.drawer.smartsavings = state
        }
      }
    }

  },
  methods: {

    open (details) {
      this.toggle.savings(true)
      console.log(details)
      this.savingsDetails = details
    }

  }
}
</script>

<style>

</style>
