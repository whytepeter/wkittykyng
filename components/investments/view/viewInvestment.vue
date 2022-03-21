<template>
  <p-side-bar :divided="false" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <v-btn
        v-if="investment && (investment.status).toLowerCase() === 'completed'"
        depressed
        tile
        small
        color="error"
        class="rounded"
      >
        <span class="text-caption text-uppercase">
          Closed Investment
        </span>
      </v-btn>
      <span v-else class="text-subtitle-1 font-weight-medium">KittyKyng</span>
    </template>
    <v-row no-gutters class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-card flat color="primary" class="mt-2">
          <v-card-text>
            <v-row no-gutters class="ma-0">
              <v-col cols="12" class="text-center">
                <v-icon color="white" large left>
                  mdi-bullseye-arrow
                </v-icon>
                <div class="text-subtitle-1 white--text">
                  {{ investment && investment.plan && investment.plan.name }}
                </div>
              </v-col>

              <v-col cols="12" class="d-flex flex-column pa-0 mb-n2 mt-2">
                <div class="d-flex align-center my-1 text-subtitle-1 text-md-h6  font-weight-medium white--text">
                  <span>
                    {{ investment && investment.principal | currency }}
                  </span>
                  <v-spacer />
                  <span class="text-caption">{{ investment && investment.plan && investment.plan.duration }} Months</span>
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
              <v-col cols="6" class="d-flex flex-column text-center">
                <div class="text-body-2 text1--text">
                  ROI
                </div>
                <div class="text3--text font-weight-medium text-subtitle-1">
                  {{ investment && investment.roi | currency }}
                </div>
              </v-col>
              <v-col cols="6" class="d-flex flex-column text-center">
                <div class="text-body-2 text1--text">
                  Interest
                </div>
                <div class="secondary--text font-weight-medium text-subtitle-1">
                  {{ investment && investment.plan && investment.plan.percentage }}%
                </div>
              </v-col>

              <v-col cols="12" class="pa-2">
                <v-divider class="my-1" />
              </v-col>
              <v-col cols="12" class="pa-2 mb-2">
                <v-card outlined>
                  <v-card-text class="d-flex align-center py-1">
                    Investment Certificate
                    <v-spacer />
                    <v-btn :loading="certLoading" depressed color="secondary" icon @click="goto(investment && investment.cert)">
                      <v-icon>
                        mdi-download
                      </v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="py-2">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <p-lil-card :name="'Effective Date'" :withdrawal-date="investment && investment.startDate" :type="'date'" />
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <p-lil-card :name="'Maturity Date'" :withdrawal-date="investment && investment.maturityDate" :type="'date'" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </p-side-bar>
</template>

<script>
import { mapActions } from 'vuex'
import PSideBar from '../../other/pSideBar.vue'
import PLilCard from '~/components/other/pLilCard.vue'
export default {
  components: { PLilCard, PSideBar },
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
    investment: {
      type: Object,
      default: () => ({})
    },
    toggle: Function
  },

  data: () => ({
    amount: 10000,
    certLoading: false,
    show: false,
    show2: false
  }),

  computed: {
    getPercent () {
      const percent = (parseInt(this.details && this.details.amountSaved && this.details && this.details.amountSaved) * 100) / parseInt(this.details && this.details.targetAmount && this.details && this.details.targetAmount)
      console.log(percent)
      return percent
    }
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    submit () {
      console.log(this.amount)
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },
    goto (link) {
      // this.certLoading = true
      // window.open(link, '_blank')
      // this.certLoading = false

      this.initAlert({
        is: true,
        type: 'info',
        persistence: true,
        message: 'Your investment certificate will be emailed to you shortly, please don\'t request again'
      })
    },
    toggleNext (state) {
      this.next = state
    }
  }
}
</script>

<style>

</style>
