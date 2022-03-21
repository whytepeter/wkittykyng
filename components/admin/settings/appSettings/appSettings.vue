<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" md="8">
      <v-card outlined>
        <v-card-title class="text-subtitle-1 text-uppercase">
          App Settings
          <v-spacer />
          <v-btn outlined small color="primary" class="text-subtitle-2 font-weight-light" @click="toggleDrawer(true)">
            Edit
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="d-flex">
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Investment Certificate</span>
              <v-spacer />
              <v-chip small :disabled="settings && !settings.certificate" :color="settings && settings.certificate ? 'secondary' : 'grey'">
                {{ settings && settings.certificate ? 'ACTIVE' : 'OFF' }}
              </v-chip>
            </v-col>
            <v-col cols="12" class="px-0 ">
              <v-divider />
            </v-col>
            <v-col cols="12" class="px-0 d-flex align-center font-weight-medium">
              <span class="text--primary">Referrals</span>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Referral Required</span>
              <v-spacer />
              <v-chip small :disabled="settings && !settings.refferal" :color="settings && settings.refferal ? 'secondary' : 'grey'">
                {{ settings && settings.refferal ? 'ACTIVE' : 'OFF' }}
              </v-chip>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Referral Percent</span>
              <v-spacer />
              <span class="text--primary text-subtitle-1 font-weight-medium">{{ settings && settings.refferalPercentage }}%</span>
            </v-col>
            <v-col cols="12" class="px-0 ">
              <v-divider />
            </v-col>
            <v-col cols="12" class="px-0 d-flex align-center font-weight-medium">
              <span class="text--primary">ROI Withdrawal Limit </span>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Maximum</span>
              <v-spacer />
              <span class="text--primary text-subtitle-1 font-weight-medium">{{ settings && settings.defaultRoiWithdrawalAmountMax | currency }}</span>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Minimum</span>
              <v-spacer />
              <span class="text--primary text-subtitle-1 font-weight-medium">{{ settings && settings.defaultRoiWithdrawalAmountMin | currency }}</span>
            </v-col>
            <v-col cols="12" class="px-0 d-flex align-center font-weight-medium">
              <span class="text--primary">Main Withdrawal Limit</span>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Maximum</span>
              <v-spacer />
              <span class="text--primary text-subtitle-1 font-weight-medium">{{ settings && settings.defaultWithdrawalAmountMax | currency }}</span>
            </v-col>
            <v-col cols="12" class="pa-0 d-flex align-center">
              <span class="text-subtitle-1">Minimum</span>
              <v-spacer />
              <span class="text--primary text-subtitle-1 font-weight-medium">{{ settings && settings.defaultWithdrawalAmountMin | currency }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <update-settings :drawer="drawer" :toggle="toggleDrawer" />
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import updateSettings from './updateSettings.vue'
export default {
  components: { updateSettings },
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
    drawer: false
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'admin/getState' }),
    settings () {
      return this.state('settings')
    }

  },
  methods: {
    toggleDrawer (state) {
      this.drawer = state
    }

  }
}
</script>

<style>

</style>
