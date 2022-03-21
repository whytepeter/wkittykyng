<template>
  <v-container v-if="user">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card tile outlined>
          <v-card-text class="d-flex align-center">
            <v-sheet class="d-flex flex-column align-start justify-center">
              <span class="text-subtitle-1 font-weight-medium text-capitalize"> {{ `${ user && user.firstName} ${ user && user.lastName}` }} -<span class="text-lowercase ml-2 font-weight-light text-subtitle-2">{{ user && user.email }}</span> </span>
              <v-chip small color="secondary" label>
                {{ user && user.role.name }}
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
  </v-container>
  <v-progress-linear
    v-else
    indeterminate
    color="secondary"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',

  data: () => ({
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' })

  },

  methods: {

  }

}
</script>

<style>

</style>
