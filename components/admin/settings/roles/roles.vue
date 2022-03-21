<template>
  <v-row justify="center">
    <v-col cols="12" class="">
      <v-card tile outlined>
        <v-card-title class="font-weight-light text-subtitle-1">
          Roles And Permissions
          <v-spacer />
          <v-btn depressed small color="primary" @click="toggleRole(true)">
            <v-icon small class="mr-2">
              mdi-plus
            </v-icon>
            Create Role
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col v-if="roles && roles.length" cols="12" md="10">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="role in roles"
          :key="role.name"
          class="mb-2"
        >
          <v-expansion-panel-header class="text-capitalize text-subtitle-1 font-weight-regular">
            {{ role.name }}
          </v-expansion-panel-header>
          <v-divider />
          <v-expansion-panel-content>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Permissions
                    </th>
                    <th class="text-left">
                      Access
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in role.permissions"
                    :key="item"
                  >
                    <td class="text-capitalize">
                      {{ item.name }}
                    </td>
                    <td class="text-capitalize">
                      {{ item.description }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div v-if="role.name !== 'admin' && role.name !== 'user'" class="text-center">
              <v-btn small text color="secondary" @click="openEdit(true, role)">
                Edit Role
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-col v-else cols="12" class="text-center py-10">
      <v-icon size="64" color="secondary">
        fas fa-user-check
      </v-icon>
      <div class="text-subtitle-1 my-2">
        You don't have any Roles
      </div>
      <v-btn
        mall
        depressed
        color="primary"
        @click="toggleRole(true)"
      >
        <v-icon small class="mr-2">
          mdi-plus
        </v-icon>
        Create Role
      </v-btn>
    </v-col>
    <create-role :modal="modal.create" :toggle="toggleRole" />
    <edit-role :role="currentRole" :modal="modal.edit" :toggle="openEdit" />
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import createRole from './createRole.vue'
import EditRole from './editRole.vue'

export default {
  name: 'RolesAndPermissions',
  components: { createRole, EditRole },
  data: () => ({
    modal: {
      create: false,
      edit: false
    },
    currentRole: {}

  }),
  computed: {
    ...mapGetters({ state: 'admin/getState' }),
    roles () {
      return this.state('roles')
    }

  },
  methods: {
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
