<template>
  <v-dialog
    v-model="modal"
    persistent
    width="500"
  >
    <v-card :loading="loading.assign">
      <v-card-title class="primary white--text text-h6 font-weight-light text-uppercase  py-4">
        <v-icon color="secondary" class="mr-4">
          fas fa-user-check
        </v-icon>
        Assign Role

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
        @submit.prevent="assignRole"
      >
        <v-card-text class="pt-6">
          <v-row no-gutters>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="email"
                type="text"
                name="name"
                dense
                outlined
                required
                :rules="emailRules"
                color="secondary"
                placeholder="Email"
                @keyup="checkEmail"
              />
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-select
                v-model="role"
                dense
                outlined
                color="secondary"
                item-text="name"
                return-object
                :items="roles"
                label="Role"
                :rules="[(v) => !!v || 'Role is required']"
                required
              />
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
            :loading="loading.assign"
            color="primary"
            depressed
            class="font-weight-light text-subtitle-2"
            type="submit"
          >
            Assign Role
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
    icon: 'mdi-close',
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    userId: '',
    role: ''

  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', state: 'admin/getState' }),
    roles () {
      const arr = this.state('roles')
      console.log(arr)
      return arr
    }
  },

  methods: {
    ...mapActions({ newRoles: 'admin/roleFunction' }),
    checkEmail () {
      const users = this.state('users')
      users && users.find((el) => {
        if (this.email === el.email) {
          this.userId = el.id
        }
      })
    },

    assignRole () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        // remove the selected from the object
        const payload = {
          userId: this.userId,
          roleId: this.role.id
        }

        // this.checkIfDone()
        console.log(payload)
        // this.newRoles(role)
      }
    },
    close () {
      this.toggle(false)
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
        if (this.loading.assign) {
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
