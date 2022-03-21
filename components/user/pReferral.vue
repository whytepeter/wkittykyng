<template>
  <p-side-bar :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          Refer & Earn
        </span>
      </div>
    </template>
    <v-form>
      <v-row no-gutters class="ma-0 my-2">
        <!-- <v-col cols="12" class="d-flex align-center px-0 text3--text text-subtitle-1">
          My Referral Earnings
          <v-spacer />

          <span class="secondary--text text-h6">{{ 7000 | currency }}</span>
        </v-col> -->
        <v-col cols="12">
          <v-card flat class="rounded-lg my-4">
            <v-card-text class="black text-caption white--text">
              Refer your friends and get rewarded with <strong>0.5%</strong>  of their first investment using the Referral Link below.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10" class="mx-auto text-center py-4">
          <div class="text3--text mb-2">
            Referral Link
          </div>
          <v-card class="pa-0" flat>
            <p-icon-card
              :size="20"
              :styles="'py-3'"
              center
              :icon="'mdi-content-copy'"
              :title="user && user.refCode"
              :action="copy"
            />
          </v-card>
        </v-col>
        <!-- <v-col cols="12" class="mb-2">
          <span class="text3--text text-body-1 ">Referrals</span>
        </v-col>
        <v-col cols="12" class="py-2">
          <p-icon-card
            outline
            :styles="'py-2'"
            :icon="'mdi-account-multiple-check'"
            :title="'₦1,000'"
            :description="'Grace Ekeuwei'"
          />
        </v-col>
        <v-col cols="12" class="py-2">
          <p-icon-card
            outline
            :styles="'py-2'"
            :icon="'mdi-account-multiple-check'"
            :title="'₦7,000'"
            :description="'Grace Ekeuwei'"
          />
        </v-col> -->
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PIconCard from '../other/pIconCard.vue'
import pSideBar from '../other/pSideBar.vue'
export default {
  name: 'PFundWallet',
  components: { pSideBar, PIconCard },
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
    isBank: false,
    bank: null,
    banks: [
      { name: 'Zenith Bank', abbr: 'DS' },
      { name: 'Access Bank Plc', abbr: 'DMI' },
      { name: 'UBA Bank', abbr: 'SS' },
      { name: 'First Bank', abbr: 'FS' }
    ],
    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    password: '',
    passwordRules: [v => !!v || 'Password is required']
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
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
    ...mapActions({ initAlert: 'controller/initAlert' }),
    copy () {
      const content = `https://kittykyng.netlify.app/register?ref=${this.user && this.user.refCode}`
      navigator.clipboard.writeText(content)
      // alert('Acc Number copied to clipboard')
      this.initAlert({
        is: true,
        type: 'info',
        message: 'Referral Link coppied to clipboard'
      })
    },
    submit () {
      alert('Clicked')
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
