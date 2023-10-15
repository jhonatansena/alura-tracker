<template>
    <div class="box forms-style">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="description"
                    >
            </div>
            <div class="column">
                <PlaybackControls @toTimerFinished="finishTask"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import PlaybackControls from './PlaybackControls.vue'

export default defineComponent({
    data() {
        return {
            description: ''
        }
    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Forms',
    emits: ['toSaveTask'],
    components: {
        PlaybackControls
    },
    methods: {
        finishTask (timeElapsed: number): void {
               this.$emit('toSaveTask', {
               timeInSeconds: timeElapsed,
               description: this.description
            })
            this.description = ''
        }
    }
})
</script>
<style>
    .forms-style {
        color: var(--text-primary);
        background-color: var(--bg-primary);
    }
</style>