<template>
  <v-app class="grey lighten-3">
    <div>
      <v-app-bar
        fixed
        flat
        app
        elevation
        outlined
        color="white"
      >
        <v-app-bar-nav-icon class="primary--text" @click.stop="mini = !mini, drawer = true" />
        <v-toolbar-items flat color="transparent white--text">
          <v-btn
            tile=""
            color=""
            class="font-weight-regular"
            text
            exact
          >
            {{ activePage }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer />

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              fab
              v-on="on"
            >
              <v-icon color="primary">
                fas fa-user-circle
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item dense to="/dashboard/home" @click="switchPage('Home')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-view-dashboard
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item dense to="/admin/account" @click="switchPage('Account')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-account
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
            <v-list-item dense to="/admin/settings" @click="switchPage('Settings')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-cog
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item dense to="/admin/error" @click="switchPage('error')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-alert-circle
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Error Log</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item dense color="error" @click="logout">
              <v-list-item-icon>
                <v-icon size="20" class="px-1" color="error">
                  fas fa-sign-out-alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="error--text">
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      dark
      src="/bg/pattern.png"
      width="220"
      mobile-breakpoint="700"
      class="primary "
    >
      <v-list-item class="px-2">
        <v-list-item-title class=" text-h4 font-weight-bold py-4">
          <v-img height="40" contain src="/logo/kittykyng-dark.png" class="" />
        </v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon color="secondary">
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />
      <v-list nav>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          exact
          link
          active-class="secondary--text font-weight-medium "
          class="my-0 text-subtitle-2 font-weight-light"
          @click="switchPage(link.name)"
        >
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="my-0 text-subtitle-2 font-weight-medium">
        <v-list-item class="" @click="logout">
          <v-list-item-icon>
            <v-icon color="error">
              fas fa-sign-out-alt
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="error--text">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3 main pb-16">
      <p-alert />
      <v-card v-if="$nuxt.isOffline" tile flat dark color="secondary">
        <v-card-text class="py-1">
          <v-icon
            color="white"
            size="36"
            left
          >
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card>
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <!-- <v-footer fixed class="pa-0 ">
      <v-bottom-navigation
        :color="color"
        shift
        class="d-block d-sm-none d-flex justity-space-around"
      >
        <v-btn
          v-for="link in sideLinks"
          :key="link.name"
          @click="goto(link.name, link.route)"
        >
          <span>{{ link.name }}</span>
          <v-icon>
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pAlert from '~/components/other/pAlert.vue'
export default {
  components: { pAlert },
  data: () => ({
    tab: null,
    messages: 2,
    drawer: true,
    mini: true,
    permanent: true,

    sideLinks: [
      { name: 'Dashboard', route: '/admin', icon: 'mdi-home-variant ' },
      {
        name: 'Investors',
        route: '/admin/investors',
        icon: 'mdi-account-group'
      },
      {
        name: 'Investments',
        route: '/admin/investments',
        icon: 'mdi-equalizer'
      },
      // {
      //   name: 'Due Payout',
      //   route: '/admin/due',
      //   icon: 'mdi-account-cash'
      // },

      {
        name: 'Withdrawals',
        route: '/admin/withdrawals',
        icon: 'mdi-bank'
      },
      {
        name: 'Transactions',
        route: '/admin/transactions',
        icon: 'mdi-text-box'

      },
      {
        name: 'Settings',
        route: '/admin/settings',
        icon: 'mdi-cog'

      }

    ]
  }),

  head () {
    return {

      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser', activePage: 'admin/getActivePage' })

  },
  created () {
    this.$store.dispatch('authentication/handleAuth')
    this.$store.dispatch('admin/initApp')
    if (this.$vuetify.breakpoint.xsOnly) {
      this.drawer = false
    }
  },
  methods: {
    ...mapMutations({ setActivePage: 'admin/setActivePage', setAlert: 'authentication/setAlert' }),
    switchPage (page) {
      this.setActivePage(page)
    },
    goto (page, to) {
      this.$router.push(to)
      this.setActivePage(page)
    },
    logout () {
      this.$store.dispatch('authentication/logoutUser')
    }
  }
}
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}

@media only screen and (max-width: 600px) {
  .main {
    padding-left:0
  }
}
</style>
