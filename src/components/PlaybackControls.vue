<template>
<div class="is-flex is-align-items-center is-justify-content-space-between">

    <Timer :timeInSeconds="timeInSeconds"/>

    <ControllButton 
        @click="startTaskTimer"
        :disabled="timerRunning"
        icon="fas fa-play"
        text="play"
    />
    <ControllButton 
        @click="endTaskTime" 
        :disabled="!timerRunning" 
        icon="fas fa-stop"
        text="stop"
    />
</div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Timer from './Timer.vue'
    import ControllButton from "./ControllButton.vue"

    export default defineComponent({
        name: 'PlaybackControls',
        emits: ['toTimerFinished'],
        components: {
            Timer,
            ControllButton
        },
        data() {
        return {
            timeInSeconds: 0,
            timer: 0,
            timerRunning: false,
        }
    },
    methods: {
        startTaskTimer() {
            this.timerRunning = true
            this.timer = setInterval(() => {
                this.timeInSeconds += 1
            }, 1000)
        },
        endTaskTime() {
            this.timerRunning = false
            clearInterval(this.timer)
            this.$emit('toTimerFinished', this.timeInSeconds)
            this.timeInSeconds = 0
        }
    }
    })
</script>