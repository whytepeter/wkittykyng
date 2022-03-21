<template>
  <p-side-bar :loading="loading.settings" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          Update Settings
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 my-4">
        <v-col cols="12" class="px-0 primary--text">
          <span>Certificate Settings</span>
        </v-col>
        <v-col cols="12" class="pa-0  mb-2 d-flex align-center">
          <span>Certificate</span>
          <v-spacer />
          <v-switch
            v-model="pCertificate"
            color="secondary"
            inset
            class="py-0 my-0"
          />
        </v-col>
        <v-col cols="12" class="px-0 primary--text">
          <span>Referral Settings</span>
        </v-col>
        <v-col cols="12" class="pa-0  mb-2 d-flex align-center">
          <span>Referral</span>
          <v-spacer />
          <v-switch
            v-model="pReferral"
            color="secondary"
            inset
            class="py-0 my-0"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pReferralPercent"
            type="text"
            name="Referral"
            outlined
            color="secondary"
            dense
            label="Referral Percent"
            :rules="requiredRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="px-0 mb-4 primary--text">
          <span>ROI Withdrawal Limit</span>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pRoiMax"
            type="text"
            name="ROI"
            outlined
            color="secondary"
            dense
            label="Maximum Amount"
            :rules="requiredRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pRoiMin"
            type="text"
            name="ROI"
            outlined
            color="secondary"
            dense
            label="Mininum"
            :rules="requiredRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="px-0 mb-4 primary--text">
          <span>Main Withdrawal Limit</span>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pMainMax"
            type="text"
            name="Main"
            outlined
            color="secondary"
            dense
            label="Maximum Amount"
            :rules="requiredRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pMainMin"
            type="text"
            name="Main"
            outlined
            color="secondary"
            dense
            label="Mininum Amount"
            :rules="requiredRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="loading.settings"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            Update Settings
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pSideBar from '~/components/other/pSideBar.vue'

export default {
  name: 'PFundWallet',
  components: { pSideBar },

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
    valid: true,

    requiredRules: [v => !!v || 'This field is required']

  }),
  computed: {
    ...mapGetters({ state: 'admin/getState', loading: 'admin/getLoading' }),
    settings () {
      return this.state('settings')
    },
    pReferral: {
      get () {
        return this.settings && this.settings.refferal
      },
      set (val) {
        this.settings.refferal = val
      }
    },
    pReferralPercent: {
      get () {
        return this.settings && this.settings.refferalPercentage
      },
      set (val) {
        this.settings.refferalPercentage = val
      }
    },
    pCertificate: {
      get () {
        return this.settings && this.settings.certificate
      },
      set (val) {
        this.settings.certificate = val
      }
    },

    pMainMax: {
      get () {
        let val = parseInt(this.settings.defaultWithdrawalAmountMax)
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
          this.settings.defaultWithdrawalAmountMax = val
        }
      }
    },
    pMainMin: {
      get () {
        let val = parseInt(this.settings.defaultWithdrawalAmountMin)
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
          this.settings.defaultWithdrawalAmountMin = val
        }
      }
    },
    pRoiMax: {
      get () {
        let val = parseInt(this.settings.defaultRoiWithdrawalAmountMax)
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
          this.settings.defaultRoiWithdrawalAmountMax = val
        }
      }
    },
    pRoiMin: {
      get () {
        let val = parseInt(this.settings.defaultRoiWithdrawalAmountMin)
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
          this.settings.defaultRoiWithdrawalAmountMin = val
        }
      }
    }

  },

  methods: {
    ...mapActions({ updateSettings: 'admin/updateSettings' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const mainMax = parseInt(this.pMainMax.split(',').join('').slice(1)).toString()
        const mainMin = parseInt(this.pMainMin.split(',').join('').slice(1)).toString()
        const roiMax = parseInt(this.pRoiMax.split(',').join('').slice(1)).toString()
        const roiMin = parseInt(this.pRoiMin.split(',').join('').slice(1)).toString()

        const payload = {
          certificate: this.pCertificate,
          refferal: this.pReferral,
          refferalPercentage: this.pReferralPercent,
          defaultRoiWithdrawalAmountMax: roiMax,
          defaultRoiWithdrawalAmountMin: roiMin,
          defaultWithdrawalAmountMax: mainMax,
          defaultWithdrawalAmountMin: mainMin
        }
        console.log(payload)
        this.updateSettings(payload)
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
