<template>
  <v-dialog
    v-model="modal"
    persistent
    width="500"
  >
    <v-card v-if="role">
      <v-card-title class="primary white--text text-h6 font-weight-light text-uppercase  py-4">
        <v-icon color="secondary" class="mr-4">
          fas fa-user-check
        </v-icon>
        Edit Role

        <v-spacer />

        <v-btn outlined x-small fab dark @click="close">
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="pb-2"
        @submit.prevent="updateRole"
      >
        <v-card-text class="pt-6">
          <v-row no-gutters>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="editRole.name"
                type="text"
                name="name"
                dense
                outlined
                required
                :rules="nameRules"
                color="primary"
                placeholder="Role Name"
                @keyup="description = `This is the ${name} Role`"
              />
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="editRole.description"
                type="text"
                name="description"
                dense
                outlined
                color="primary"
                placeholder="Role Description"
              />
            </v-col>
            <v-col cols="12" class="py-0 text-subtitle-2 font-weight-regular">
              Permissions
            </v-col>
            <v-col v-for="item in permissions" :key="item.slug" cols="4" class="py-1 ml-1">
              <v-chip label :outlined="!item.selected" :color=" item.selected ? 'secondary' : 'grey'" @click="selectPermission(item)">
                {{ item.name }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="error"
            text
            class="font-weight-light text-subtitle-2"
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="loading.roles"
            color="primary"
            depressed
            class="font-weight-light text-subtitle-2"
            type="submit"
          >
            Edit Role
            <v-icon small class="ml-2" color="white">
              mdi-arrow-right-thin-circle-outline
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

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
  props: {
    id: String,
    role: {
      type: Object,
      default: () => ({})
    },
    modal: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function
    }
  },

  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Role name is required'],
    description: '',
    selected: [],
    permissions: [
      {
        name: 'Manage User',
        description: 'All privileges related to User management',
        slug: 'user_manage',
        selected: false
      },
      {
        name: 'Manage Investments',
        description: 'All privileges related to Investment management',
        slug: 'investment_manage',
        selected: false
      }

    ]

  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' }),

    editRole () {
      console.log(this.role)
      const newRole = {
        name: this.role.name,
        description: this.role.description,
        permissions: this.role.permissions,
        id: this.role.id
      }
      return newRole
    }
  },

  methods: {
    ...mapActions({ update: 'admin/roleFunction' }),

    selectPermission (el) {
      console.log(el)
      el.selected = !el.selected
      if (el.selected) {
        this.selected.push(el)
      } else {
        const index = this.selected.indexOf(el)
        this.selected.splice(index, 1)
      }
    },

    updateRole () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        // remove the selected from the object
        const selected = []
        const permissions = [
          {
            name: 'Manage User',
            description: 'All privileges related to User management',
            slug: 'user_manage'
          },
          {
            name: 'Manage Investments',
            description: 'All privileges related to Investment management',
            slug: 'investment_manage'
          }
        ]
        // get rid of the selected option on the object
        permissions.forEach((el) => {
          this.selected.forEach((j) => {
            if (j.slug === el.slug) {
              selected.push(el)
            }
          })
        })

        const role = {
          name: this.editRole.name,
          permission: selected,
          description: this.editRole.description,
          id: this.editRole.id,
          type: 'edit'
        }
        console.log(role)
        this.update(role)
        this.checkIfDone()
      }
    },
    close () {
      this.toggle(false)
      this.selected = []
      this.permissions.forEach((el) => {
        el.selected = false
      })
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    checkIfDone () {
      setInterval(() => {
        if (this.loading.roles) {
          setTimeout(() => {
            this.close()
          }, 2000)
        }
      }, 1000)
    }
  }

}
</script>

<style>

</style>
