<template>
  <div>Me</div>
  <span>1212122</span>
  <div>
    <v-button plain hairline type="primary">Button</v-button>
    <v-button plain hairline type="primary">Button2</v-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import { Button } from 'vant'

  export default defineComponent({
    name: 'Me',
    components: {
      'v-button': Button,
    },
  })
</script>
