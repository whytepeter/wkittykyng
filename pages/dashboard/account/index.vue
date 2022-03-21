<template>
  <v-container fluid class="pa-0">
    <p-header :height="130" pcard :color="'black'" :classes="'pt-16'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0 mt-6">
          <p-profile :dark="false" :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->
      </v-row>
    </p-header>
    <v-row class="ma-0">
      <!-- ///////////////////  Mobile View ///////////////// -->

      <v-col cols="12" md="8" class="d-block d-md-none">
        <v-row no-gutters class="ma-0">
          <!-- <v-col cols="12" class="px-4">
            <v-switch v-model="switchMe" color="secondary" inset>
              <template v-slot:label>
                <span class="text2--text text-subtitle-1 font-weight-light">Show Dashboard Balance</span>
                <v-progress-circular
                  :indeterminate="switchMe"
                  :value="0"
                  size="24"
                  class="ml-2"
                />
              </template>
            </v-switch>
          </v-col> -->
          <!-- <v-col cols="12" sm="6" class="pa-2">
            <p-icon-card :styles="'py-6'" :icon="'mdi-bank'" :title="'7820765461'" :description="'BBMPC Account Number'" />
          </v-col> -->
          <v-col cols="12" sm="6" class="pa-2">
            <v-card class="pa-0" flat @click="copy(user && user.refCode)">
              <p-icon-card
                :size="20"
                :styles="'py-3'"
                center
                :icon="'mdi-content-copy'"
                :title="`Referral Link - ${user && user.refCode}`"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="4" class="">
        <p-profile-actions
          v-for="(option, i) in options"
          :key="i"
          :title="option.title"
          :color="option.color"
          :action="option.action"
          :icon="option.icon"
        />
      </v-col>

      <!-- ///////////////////  Desktop View ///////////////// -->
      <v-col cols="12" md="8" class="d-none d-md-block">
        <v-row no-gutters class="ma-0">
          <!-- <v-col cols="12" class="px-4">
            <v-switch v-model="switchMe" color="secondary" inset>
              <template v-slot:label>
                <span class="text2--text text-subtitle-1 font-weight-light">Show Dashboard Balance</span>
                <v-progress-circular
                  :indeterminate="switchMe"
                  :value="0"
                  size="24"
                  class="ml-2"
                />
              </template>
            </v-switch>
          </v-col> -->
          <!-- <v-col cols="12" sm="6" class="pa-2">
            <p-icon-card :styles="'py-6'" :icon="'mdi-bank'" :title="'7820765461'" :description="'BBMPC Account Number'" />
          </v-col> -->
          <v-col cols="12" sm="6" class="pa-2">
            <v-card class="pa-0" flat @click="copy(user && user.refCode)">
              <p-icon-card
                :size="20"
                :styles="'py-3'"
                center
                :icon="'mdi-content-copy'"
                :title="`Referral Link - ${user && user.refCode}`"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <p-profile-details :user="user" :drawer="drawer.profile" :toggle="toggle.profile" />
    <p-card-and-bank :drawer="drawer.cardAndBank" :toggle="toggle.cardAndBank" />
    <p-security :drawer="drawer.security" :toggle="toggle.security" />
    <p-referral :drawer="drawer.referral" :toggle="toggle.referral" />
    <p-kyc :drawer="drawer.kyc" :toggle="toggle.kyc" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pHeader from '~/components/other/pHeader.vue'
import PIconCard from '~/components/other/pIconCard.vue'
import PProfileActions from '~/components/other/pProfileActions.vue'
import PSecurity from '~/components/other/pSecurity.vue'
import PCardAndBank from '~/components/user/cardAndBank/pCardAndBank.vue'
import PKyc from '~/components/user/pKyc.vue'
import PProfile from '~/components/user/pProfile.vue'
import PProfileDetails from '~/components/user/pProfileDetails.vue'
import PReferral from '~/components/user/pReferral.vue'
export default {
  name: 'Account',
  components: { pHeader, PProfile, PProfileDetails, PCardAndBank, PSecurity, PIconCard, PReferral, PProfileActions, PKyc },
  layout: 'dashboard',
  data: () => ({
    switchMe: false,
    drawer: {
      profile: false,
      cardAndBank: false,
      security: false,
      referral: false,
      kyc: false
    }
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    options () {
      return [
        {
          title: 'Profile Details',
          icon: 'mdi-account',
          action: () => {
            this.toggle.profile(true)
          }

        },
        {
          title: 'Card & Bank Settings',
          icon: 'mdi-credit-card',
          action: () => {
            this.toggle.cardAndBank(true)
          }

        },
        {
          title: 'Security Settings',
          icon: 'mdi-shield-lock',
          action: () => {
            this.toggle.security(true)
          }

        },
        {
          title: 'Update KYC',
          icon: 'mdi-folder-account',
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

        },
        {
          title: 'Logout',
          color: 'error',
          icon: 'fas fa-sign-out-alt',
          action: () => {
            this.logout()
          }

        }

      ]
    },
    toggle () {
      return {
        profile: (state) => {
          this.drawer.profile = state
        },
        cardAndBank: (state) => {
          this.drawer.cardAndBank = state
        },
        security: (state) => {
          this.drawer.security = state
        },
        referral: (state) => {
          this.drawer.referral = state
        },
        kyc: (state) => {
          this.drawer.kyc = state
        }
      }
    }
  },
  methods: {
    ...mapActions({ initAlert: 'controller/initAlert', logout: 'authentication/logoutUser' }),
    copy (payload) {
      const content = `https://kittykyng.netlify.app/register?ref=${payload}`
      navigator.clipboard.writeText(content)
      // alert('Acc Number copied to clipboard')
      this.initAlert({
        is: true,
        type: 'info',
        message: 'Referral Link coppied to clipboard'
      })
    }

  }

}
</script>

<style>

</style>
