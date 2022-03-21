<template>
  <v-container fluid class="pa-0">
    <p-header :dark="true" :height="100" pcard :color="'white'" :classes="'pt-16'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0 ">
          <p-profile :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
          <!-- <p-notification style="z-index:3" /> -->
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->
      </v-row>
    </p-header>

    <v-row no-gutters class="ma-0 ">
      <v-col cols="12" md="9" class="pa-0">
        <v-row class="ma-0">
          <v-col cols="12" class="py-0">
            <p-scroll>
              <p-wallet-cards
                v-for="(wallet, i) in wallets"
                :key="i"
                :loading="false"
                :type="wallet.type"
                :color="wallet.color"
                :icon-color="wallet.iconColor"
                :icon="wallet.icon"
                :amount="wallet.amount"
                :to="wallet.to"
                :name="wallet.name"
                :button="wallet.button"
                :action="toggle.fundWallet"
              />
            </p-scroll>
          </v-col>

          <!-- <v-col cols="12" class="mt-6 mb-2 py-0 px-sm-4">
            <span class="text-subtitle-2 font-weight-light text-uppercase">
              Featured Investments
            </span>
          </v-col>

          <v-col cols="12" class="mb-2">
          </v-col> -->
          <p-container tile :border="false" :title="'Featured Investment'">
            <p-featured-investments />
          </p-container>
        </v-row>
      </v-col>

      <!-- Quick Actions on the right side pannel -->
      <v-col cols="12" md="3" :class="$vuetify.breakpoint.mdAndUp ?'grey lighten-4':''" class="pa-2 py-md-0 pl-md-1 ">
        <v-card :height="$vuetify.breakpoint.mdAndUp ? '100%' : 'auto' " tile flat class="pa-0 transparent">
          <v-card-text class="pa-0">
            <v-row class="ma-0">
              <p-container :style="$vuetify.breakpoint.mdAndUp ? 'height:100vh' : 'height: auto'" divider tile :border="false" :title="'Quick Actions'">
                <p-icon-card
                  v-for="(action, i) in actions"
                  :key="i"
                  :styles="'py-3 px-1'"
                  outline
                  :size="26"
                  :action="action.action"
                  :title="action.title"
                  :icon="action.icon"
                  class="mb-4"
                />
              </p-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <get-account :modal="modal" :toggle="toggle.modal" />
    <p-kyc :drawer="drawer.kyc" :toggle="toggle.kyc" />
    <p-fund-wallet :drawer="drawer.fundWallet" :toggle="toggle.fundWallet" />
    <p-referral :drawer="drawer.referral" :toggle="toggle.referral" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PContainer from '~/components/other/pContainer.vue'
import pHeader from '~/components/other/pHeader.vue'
import PIconCard from '~/components/other/pIconCard.vue'
import PScroll from '~/components/other/pScroll.vue'
import PWalletCards from '~/components/other/pWalletCards.vue'
import PProfile from '~/components/user/pProfile.vue'
import PFundWallet from '~/components/user/fundWallet/pFundWallet.vue'
import PFeaturedInvestments from '~/components/investments/pFeaturedInvestments.vue'
import GetAccount from '~/components/user/getAccount.vue'
import PKyc from '~/components/user/pKyc.vue'
import PReferral from '~/components/user/pReferral.vue'
export default {
  name: 'Dashboard',
  components: { pHeader, PProfile, PFundWallet, PWalletCards, PScroll, PContainer, PIconCard, PFeaturedInvestments, GetAccount, PKyc, PReferral },
  layout: 'dashboard',
  filters: {
    currency (val) {
      if (val) {
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
      kyc: false,
      referral: false,
      fundWallet: false
    }

  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    modal () {
      return this.user && this.user.kyc.bvn
    },
    toggle () {
      return {
        modal: (state) => {
          this.modal = state
        },
        kyc: (state) => {
          this.drawer.kyc = state
        },
        referral: (state) => {
          this.drawer.referral = state
        },
        fundWallet: (state) => {
          this.drawer.fundWallet = state
        }
      }
    },
    wallets () {
      return [
        {
          name: 'My Wallet',
          icon: 'mdi-wallet',
          amount: this.user && this.user.wallet.main,
          type: 'wallet',
          color: 'black',
          iconColor: 'secondary',
          to: '/dashboard/wallet'
          // button: {
          //   is: true,
          //   text: 'Fund Wallet',
          //   icon: 'mdi-plus',
          //   action: () => {
          //     alert(`This is ${this.wallets[0].name}`)
          //   }
          // }
        },
        {
          name: 'ROI',
          icon: 'mdi-finance',
          amount: this.user && this.user.wallet.roi,
          color: 'black',
          iconColor: 'secondary',
          to: '/dashboard/investments'
        }

      ]
    },

    actions () {
      return [
        {
          title: 'Start Investing',
          icon: 'mdi-finance',
          action: () => {
            this.$router.push('/dashboard/investments')
          }
        },

        {
          title: 'Update Profile Info',
          icon: 'mdi-account-check',
          action: () => {
            this.toggle.kyc(true)
          }
        },
        {
          title: 'Refer & Earn',
          icon: 'mdi-gift-open',
          action: () => {
            this.toggle.referral(true)
          }
        }
      ]
    }
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' })
  }

}
</script>

<style>

</style>
