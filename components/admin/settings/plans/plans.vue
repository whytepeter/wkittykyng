<template>
  <v-row v-if="user" justify="center">
    <v-col cols="12" class="">
      <v-divider />
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-light">
          Investment Plans
          <v-chip class="ml-1" color="primary" small label outlined>
            {{ plans.length }}
          </v-chip>
          <v-divider class="mx-4" inset vertical />
        </v-toolbar-title>

        <v-spacer />

        <v-btn

          depressed
          left
          color="primary"
          class="text-subtitle-2 font-weight-light"
          @click="toggleDrawer(true)"
        >
          <v-icon small class="mr-md-2">
            mdi-plus
          </v-icon>
          <span class="d-none d-md-flex"> Create a Plan</span>
        </v-btn>
      </v-toolbar>
      <v-divider />
    </v-col>
    <v-col v-if="plans && plans.length" cols="11" md="10" class="pa-0">
      <v-row class="ma-0">
        <v-col v-for="plan in plans " :key="plan.id" cols="12" sm="6" md="4">
          <v-card outlined>
            <v-card-title class="primary white--text text-subtitle-1 text-sm-h6 font-weight-light">
              <v-spacer />
              <span> {{ plan.name }} </span>
              <v-spacer />
              <v-menu

                left
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn

                    v-bind="attrs"
                    small
                    dark
                    fab
                    depressed
                    color="primary"
                    v-on="on"
                  >
                    <v-icon size="20">
                      mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item dense @click="toggleEdit(true, plan)">
                    <v-list-item-icon>
                      <v-icon size="20" class="px-1">
                        mdi-pencil
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Edit Plan</v-list-item-title>
                  </v-list-item>
                  <v-list-item dense @click="toggleDelete(true, plan)">
                    <v-list-item-icon>
                      <v-icon size="20" class="px-1">
                        mdi-delete
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Delete Plan</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="px-0">
              <v-row class="ma-0">
                <v-col cols="12" class="d-flex flex-column align-center primary--text">
                  <span class="text-h4 secondary--text font-weight-medium">{{ plan.percentage }}<span class=" text-h5">%</span></span>
                  <span class="text-suntitle-2">Interest</span>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-divider />
                </v-col>
                <v-col cols="12" class="d-flex flex-column align-center primary--text">
                  <span class="text-h6 font-weight-medium">{{ plan.minAmount | currency }}</span>
                  <span class="text-suntitle-2">Min Amount</span>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-divider />
                </v-col>
                <v-col cols="12" class="d-flex flex-column align-center primary--text">
                  <span class="text-h6  font-weight-medium">{{ plan.duration }} Months</span>
                  <span class="text-suntitle-2">Duration</span>
                </v-col>
                <v-col cols="12" class="pa-0 mb-n4 primary">
                  <v-divider />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else cols="12" class="text-center py-10 mt-sm-16">
      <v-icon size="64" color="grey">
        mdi-finance
      </v-icon>
      <div class="text-subtitle-1 my-2">
        You don't have any Plans
      </div>
      <!-- <v-btn depressed color="primary" class="font-weight-light text-subtitle-2">
        Create a Plan
        <v-icon small color="white" class="ml-2">
          mdi-plus
        </v-icon>
      </v-btn> -->
    </v-col>
    <create-plan :type="type" :plan="plan" :drawer="drawer.create" :toggle="toggleDrawer" />
    <delete-plan :type="type" :plan="plan" :modal="drawer.delete" :toggle="toggleDelete" />
  </v-row>
  <v-progress-linear
    v-else
    indeterminate
    color="secondary"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import createPlan from './createPlan.vue'
import DeletePlan from './deletePlan.vue'

export default {
  name: 'Plans',
  components: { createPlan, DeletePlan },
  layout: 'admin',
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

    drawer: {
      create: false,
      delete: false
    },
    type: 'create',
    plan: {}
  }),

  computed: {
    ...mapGetters({ user: 'authentication/getUser', state: 'admin/getState' }),
    plans () {
      const arr = this.state('plans')
      console.log('Plans', arr)
      return arr
    }
  },

  methods: {
    toggleDrawer (state) {
      this.drawer.create = state
      console.log(this.drawer.create)
      this.plan = {}
      if (!state) {
        this.type = 'create'
      }
    },
    toggleEdit (state, plan) {
      this.type = 'edit'
      this.drawer.create = state
      if (state) {
        this.plan = plan
      } else {
        this.plan = {}
      }
      console.log(this.drawer.create)
    },
    toggleDelete (state, plan) {
      this.type = 'delete'
      this.drawer.delete = state
      if (state) {
        this.plan = plan
      }
      console.log(this.drawer.delete)
    }

  }

}
</script>

<style>

</style>
