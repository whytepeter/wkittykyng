<template>
  <p-side-bar :loading="type === 'user'? loading.profile : loading2.profile" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          Update Profile
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 my-4">
        <!--
          <v-col cols="12" class="px-0 mb-2 text3--text text-h6">
          Edit Profile
        </v-col>
        <v-col cols="12" class=" py-4 d-flex align-center">
          <v-avatar style="border:2px solid #dddd" size="90">
            <v-img src="/logo/default.png" />
          </v-avatar>

          <span style="cursor:pointer" class="ml-2">Tab to change</span>
        </v-col> -->
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pFirstName"
            type="text"
            name="firstName"
            outlined
            color="secondary"
            label="FirstName"
            :rules="firstNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pLastName"
            type="text"
            name="lastName"
            outlined
            color="secondary"
            label="Last Name"
            :rules="lastNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pEmail"
            type="text"
            name="email"
            outlined
            disabled
            color="secondary"
            label="Email"
            :rules="emailRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="pPhoneNumber"
            type="text"
            name="phoneNumber"
            outlined
            color="secondary"
            label="Phone Number"
            :rules="phoneNumberRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="type === 'user'? loading.profile : loading2.profile"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            Update Profile
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pSideBar from '../other/pSideBar.vue'
export default {
  name: 'PFundWallet',
  components: { pSideBar },
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
  props: {
    type: {
      type: String,
      default: 'user'
    },
    user: {
      type: Object,
      default: () => ({})
    },
    drawer: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },
  data: () => ({
    valid: true,
    firstNameRules: [v => !!v || 'First Name is required'],
    lastNameRules: [v => !!v || 'Last Name is required'],
    phoneNumberRules: [v => !!v || 'Phone Number is required'],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]

  }),
  computed: {
    ...mapGetters({ loading: 'controller/getLoading', loading2: 'admin/getLoading' }),
    pFirstName: {
      get () {
        return this.user && this.user.firstName
      },
      set (val) {
        this.user.firstName = val
      }
    },
    pLastName: {
      get () {
        return this.user && this.user.lastName
      },
      set (val) {
        this.user.lastName = val
      }
    },
    pEmail: {
      get () {
        return this.user && this.user.email
      },
      set (val) {
        this.user.email = val
      }
    },
    pPhoneNumber: {
      get () {
        return this.user && this.user.phone
      },
      set (val) {
        this.user.phone = val
      }
    }
  },

  methods: {
    ...mapActions({ updateProfile: 'controller/updateProfile', updateUserProfile: 'admin/updateUserProfile' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          firstName: this.pFirstName,
          lastName: this.pLastName,
          phone: this.pPhoneNumber
        }
        console.log(payload)
        if (this.type === 'user') {
          this.updateProfile(payload)
        } else {
          payload.id = this.user.id
          // payload.roleId = 'a62d430d-97b7-49ce-88be-b8f4d7cbe2b2'
          this.updateUserProfile(payload)
        }
      }
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },
    to (to) {
      this.$router.push(to)
    }
  }

}
</script>

<style>

</style>
