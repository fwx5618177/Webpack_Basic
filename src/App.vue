<template>
    <div>
        <span>Vue</span>
        <p>{{ name }}</p>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const name = ref('utxt')

        return {
            name
        }
    },
})
</script>
