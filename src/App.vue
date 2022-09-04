<template>
  <div>
    <span>Vue</span>
    <p>{{ name }}</p>

    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref('adwadww')
</script>
