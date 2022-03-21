<template>
  <v-container class="pa-0">
    <v-row no-gutters justify="center" class="ma-0">
      <v-col cols="12" md="11">
        <v-row class="ma-0">
          <v-col cols="12" md="8">
            <v-card outlined class="rounded-lg">
              <v-card-text>
                <v-row no-gutters class="ma-0">
                  <v-col cols="12" sm="8" lg="9" class="d-flex align-center">
                    <v-icon color="secondary" large left>
                      mdi-safe-square
                    </v-icon>
                    <div class="d-flex flex-column ml-sm-4">
                      <span class="text-capitalize text-subtitle-1 font-weight-medium">
                        My Balance
                      </span>
                      <span class="secondary--text text-h5 text-sm-h4 font-weight-bold">{{ dailySavings | currency }}</span>
                      <div class="mt-1">
                        <span class="text3--text text-subtitle-1">4%</span>
                        <span class="text-body-2 ">Interest in 6 months</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cold="12" sm="4" lg="3" class="mt-2">
                    <v-btn block depressed color="secondary" class="text-subtitle-2 font-weight-normal" @click="toggle.quicksave(true)">
                      Quick Save
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-row no-gutters class="ma-0">
              <v-col cols="6" sm="12" class="pa-1">
                <p-lil-card :toggle="toggle.autosave" />
              </v-col>
              <v-col cols="6" sm="12" class="pa-1">
                <p-lil-card :name="'Withdrawal Date'" :withdrawal-date="'21 March, 2021'" :type="'date'" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="11">
        <p-transaction />
      </v-col>
    </v-row>
    <p-quick-saving :drawer="drawer.quicksave" :toggle="toggle.quicksave" />
    <p-autosave :type="0" :drawer="drawer.autosave" :toggle="toggle.autosave" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import PLilCard from '../other/pLilCard.vue'
import PAutosave from '../other/autosave/pAutosave.vue'
import PQuickSaving from './pQuickSaving.vue'
import PTransaction from '~/components/other/pTransaction.vue'

export default {
  components: { PLilCard, PTransaction, PQuickSaving, PAutosave },
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
      quicksave: false,
      autosave: false
    }
  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    dailySavings () {
      return this.user && this.user.DailySavingsWallet.balance
    },

    autoSavings () {
      return this.user && this.user.UserSetting.dailyAutoSave
    },
    toggle () {
      return {
        quicksave: (state) => {
          this.drawer.quicksave = state
        },
        autosave: (state) => {
          this.drawer.autosave = state
        }
      }
    }
  },

  methods: {

  }
}
</script>

<style>

</style>
