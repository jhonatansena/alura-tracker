<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <section>
        <strong class="display">
            {{ timeElapsed }}
        </strong>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Timer',
        props: {
            timeInSeconds: {
                type: Number,
                default: 0
            }
        },
        computed: {
        timeElapsed(): string {
            const formattedTime = new Date(this.timeInSeconds * 1000).toISOString().substring(11, 19);
            return formattedTime;
        }
    },
    })
</script>

<style>
.display {
    color: var(--text-primary);
}
</style>