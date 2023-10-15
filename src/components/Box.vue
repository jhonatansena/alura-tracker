<template>
        <div class="class box has-text-weight-bold" :style="style">
            <slot></slot>
        </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Box',
    data () {
        return {
            style: {
                backgroundColor: '#FAF0CA'
            }
        }
    }
    
})
</script>
