<template>
  <v-container fluid class="pa-0">
    <p-header :height="$vuetify.breakpoint.xsOnly ? 200 : 220" pcard :color="'black'" :styles="'pt-6'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0 mt-1">
          <p-profile :dark="false" :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->

        <v-col cols="12" class="pa-0 mt-n4 mt-md-n6 ">
          <p-wallet :wallets="wallets" />
        </v-col>
      </v-row>
    </p-header>
    <v-row justify="center" no-gutters class="ma-0">
      <v-col cols="12" md="10" class="pa-0">
        <v-card tile flat>
          <v-card-text class="pa-0">
            <v-tabs
              v-model="tab"
              fixed-tabs
              icons-and-text
              color="secondary"
              class=""
            >
              <v-tabs-slider />

              <v-tab v-for="(item, i) in tabItems" :key="i" :href="`#${item.slug}`">
                <span>{{ $vuetify.breakpoint.xsOnly ? item.short : item.name }}</span>
                <v-icon>{{ item.icon }}</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(item, i) in tabItems"
                :key="i"
                :value="item.slug"
              >
                <component :is="item.slug" :switch-tabs="switchTabs" />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Expired from '~/components/investments/expired.vue'
import Explore from '~/components/investments/explore.vue'
import My from '~/components/investments/my.vue'
import pHeader from '~/components/other/pHeader.vue'
import PWallet from '~/components/other/pWallet.vue'
import PProfile from '~/components/user/pProfile.vue'
export default {
  name: 'Savings',
  components: { pHeader, PWallet, PProfile, My, Explore, Expired },
  layout: 'dashboard',
  data: () => ({
    tab: null
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    wallets () {
      return [
        {
          name: 'ROI',
          icon: 'mdi-finance',
          amount: this.user && this.user.wallet.roi
        }
      ]
    },
    tabItems () {
      return [
        {
          name: 'My Investments',
          short: 'Investments',
          slug: 'my',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Explore Investments',
          short: 'Explore',
          slug: 'explore',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Completed Investments',
          short: 'Expired',
          slug: 'expired',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    }

  },
  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    switchTabs (tab) {
      this.tab = tab
    }
  }

}
</script>

<style>
.v-slide-group:not(.v-slide-group--has-affixes) > .v-slide-group__prev, .v-slide-group:not(.v-slide-group--has-affixes) > .v-slide-group__next {
    display: none;
}

.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
    display: none;
    /* display: initial; */
    /* visibility: hidden; */
}

</style>
