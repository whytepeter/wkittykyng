<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-divider />
        <v-tabs
          v-if="user && user.role.name === 'administrator'"
          v-model="tab"
          align-with-title
          color="secondary"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            class="text-capitalize"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-tabs
          v-else
          v-model="tab"
          align-with-title
          color="secondary"
        >
          <v-tab
            v-for="tab in tabs2"
            :key="tab.name"
            :href="tab.href"
            class="text-capitalize"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-divider />
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-tabs-items v-model="tab" class="transparent">
          <v-tab-item value="profile">
            <profile :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="team">
            <team :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="roles">
            <roles :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="security">
            <security :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="plans">
            <plans :switch-tabs="switchTabs" />
          </v-tab-item>
          <v-tab-item value="settings">
            <app-settings :switch-tabs="switchTabs" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AppSettings from '~/components/admin/settings/appSettings/appSettings.vue'
import Plans from '~/components/admin/settings/plans/plans.vue'
import profile from '~/components/admin/settings/profile.vue'
import Roles from '~/components/admin/settings/roles/roles.vue'
import Security from '~/components/admin/settings/security.vue'
import Team from '~/components/admin/settings/team/team.vue'

export default {
  components: { profile, Team, Roles, Plans, AppSettings, Security },
  layout: 'admin',
  data: () => ({
    authorize: false,
    tab: null,
    tabs: [
      { name: 'Profile', href: '#profile' },
      { name: 'Team', href: '#team' },
      { name: 'Blocked Account', href: '#block' },
      { name: 'Plans', href: '#plans' },
      { name: 'Roles & Permissions', href: '#roles' },
      { name: 'Security', href: '#security' },
      { name: 'Settings', href: '#settings' }
    ],
    tabs2: [
      { name: 'Profile', href: '#profile' },
      { name: 'Team', href: '#team' },
      { name: 'Blocked Account', href: '#block' },
      { name: 'Plans', href: '#plans' },
      { name: 'Roles & Permissions', href: '#roles' },
      { name: 'Security', href: '#security' },
      { name: 'Settings', href: '#settings' }
    ]

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' })
  },

  methods: {
    switchTabs (tab) {
      this.tab = tab
    }
  }
}
</script>

<style>

</style>
