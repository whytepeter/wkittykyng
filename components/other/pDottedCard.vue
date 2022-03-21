<template>
  <v-card
    flat
    min-width="250"
    class="mx-2 my-4 cardHover rounded-lg"
    :to="to"
    :max-height="maxHeight"
    :max-width="maxWidth"
    @click="action"
  >
    <v-card-text :class="`${styles} ${ hover ? 'dottedCardHover' : 'error'}`" class=" d-flex align-center  dottedCard">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {

  props: {

    color: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: [String, Number],
      default: ''
    },
    maxHeight: {
      type: [String, Number],
      default: ''
    },

    to: {
      type: String,
      default: ''
    },
    hover: {
      type: Boolean,
      default: true
    },
    styles: {
      type: [String, Array, Object],
      default: ''
    },
    action: Function
  },
  data: () => ({
    colors: {
      primary: '#15181E',
      dark: '#1A006B',
      secondary: '#FFA100',
      accent: '#1698D4',

      error: '#EB5757',
      success: '#0FC236'

    }
  })

}
</script>

<style>

.dottedCard {
  position:relative;
  border: 2px dotted rgba(204, 200, 223, 0.867);
  transition: all .3s ease-in-out;
  z-index:2
}
.dottedCardHover:hover, .dottedCardHover:focus{
  border: 1.5px solid #FFA100;
}

.dottedCardHover .icon{
  color: #555A68;
}
.dottedCard:hover .icon{
  color: #FFA100;
}
</style>
