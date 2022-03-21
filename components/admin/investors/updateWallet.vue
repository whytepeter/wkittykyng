<template>
  <p-side-bar :loading="loading.wallet" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column text-capitalize">
        <span>
          {{ type }} Wallet
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 my-2">
        <v-col cols="12" class="d-flex align-center px-0 mb-3 text3--text text-subtitle-1 text-capitalize">
          <span>{{ walletType }} Wallet Balance</span>
          <v-spacer />
          <v-chip v-if="walletType.toLowerCase() === 'main'" label color="primary">
            <span v-if="user && user.wallet && user.wallet.main !== 0">{{ user && user.wallet && user.wallet.main | currency }}</span>
            <span v-else>₦0.00</span>
          </v-chip>
          <v-chip v-else label color="primary">
            <span v-if="user && user.wallet && user.wallet.roi !== 0">{{ user && user.wallet && user.wallet.roi | currency }}</span>
            <span v-else>₦0.00</span>
          </v-chip>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-select
            v-model="walletType"
            :items="['Main', 'ROI']"
            value="Main"
            label="Choose Wallet"
            outlined
            class="text-subtitle-2 font-weight-light"
            return-object
            single-line
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pAmount"
            type="text"
            name="amount"
            outlined
            color="secondary"
            label="amount"
            :rules="amountRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="loading.wallet"
            depressed
            :color="type === 'credit' ? 'success' : 'error'"
            class="text-subtitle-2 font-weight-normal "
          >
            {{ type }} Wallet
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
  name: 'UpdateWallet',
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
    toggle: Function,
    user: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'type'
    }
  },
  data: () => ({
    valid: true,
    profilePic: '',
    walletType: 'Main',
    amount: '',
    amountRules: [v => !!v || 'Amount is required']
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' }),
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
    ...mapActions({ updateWallet: 'admin/updateWallet' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.pAmount.split(',').join('').slice(1)).toString()

        const payload = {
          type: this.type,
          id: this.user.id,
          walletType: this.walletType.toLowerCase(),
          amount
        }

        console.log(payload)
        this.updateWallet(payload)
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
