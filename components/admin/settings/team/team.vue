<template>
  <v-container fluid>
    <v-row v-if="user && user.role.name === 'admin'" justify="center" class="grey lighten-3 pt-0">
      <v-col cols="12" class="pa-0">
        <v-card tile outlined>
          <v-card-title class="font-weight-light text-subtitle-1">
            Manage Teams
            <v-spacer />
            <v-btn

              depressed
              left
              color="primary"
              class="text-subtitle-2 font-weight-light"
              @click="toggleRole(true)"
            >
              <v-icon small class="mr-md-2">
                mdi-plus
              </v-icon>
              <span class="d-none d-md-flex"> Assign Role</span>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col v-for="user in teams" :key="user.id" cols="12" md="8" class="py-1 px-0">
        <v-card tile outlined>
          <v-card-text class="d-flex align-center">
            <v-sheet class="d-flex flex-column align-start justify-center">
              <span class="text-subtitle-1 font-weight-medium text-capitalize"> {{ `${user.firstName} ${user.lastName}` }} -<span class="text-lowercase ml-2 font-weight-light text-subtitle-2">{{ user.email }}</span> </span>
              <v-chip small color="secondary" label>
                {{ user.role.name }}
              </v-chip>
            </v-sheet>
            <v-spacer />
            <v-btn small outlined color="primary">
              Edit
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <team-drawer :modal="modal.create" :toggle="toggleRole" />
  </v-container>
  <!-- <v-progress-linear
    v-else
    indeterminate
    color="secondary"
  /> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import teamDrawer from './teamDrawer.vue'

export default {
  name: 'RolesAndPermissions',
  components: { teamDrawer },
  data: () => ({
    isRole: false,
    editUser: null,
    modal: {
      create: false,
      edit: false
    }
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'admin/getState', roles: 'admin/getRoles' }),
    teams () {
      const users = []
      this.state('users').forEach((el) => {
        if (el.role.name !== 'user') {
          users.push(el)
        }
      })

      console.log(users)
      return users
    }
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    toggleRole (state) {
      this.modal.create = state
    },
    openEdit (state, role) {
      this.modal.edit = state
      this.currentRole = role
      console.log(this.currentRole)
    }
  }

}
</script>

<style>

</style>
