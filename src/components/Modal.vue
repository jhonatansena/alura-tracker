<template>
    <div class="modal" :class="{ 'is-active' :show }" v-if="show">
        <div class="modal-background"></div>
        <div class="modal-card">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Modal",
    props: {
        show: {
            type: Boolean,
            required: true
        }
    }
})
</script>