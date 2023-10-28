<template>
    <div class="box forms-style">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="description"
                    >
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProject">
                        <option value="">Selecione o projeto</option>
                        <option 
                         :value="project.id"
                         v-for="project in projects"
                         :key="project.id"
                        >
                        {{  project.name }}
                    </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <PlaybackControls @toTimerFinished="finishTask"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent } from 'vue'
import PlaybackControls from './PlaybackControls.vue'
import { useStore } from 'vuex'
import { useStore as anotherStore } from '@/store'

import  { key } from '@/store'
import { INotification, NotificationType } from '@/interfaces/INotification'
import { NOTIFY } from '@/store/mutationTypes'

export default defineComponent({
    data() {
        return {
            description: '',
            idProject: '',
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
            const project = this.projects.find((p) => p.id == this.idProject)

            if (!project) {
                const notification: INotification = 
            {
                id: Number(new Date().getTime().toString()),
                title: 'Erro ao adicionar projeto',
                text: 'OPs ;) Você precisa escolher um projeto antes de finalizar uma tarefa',
                type: NotificationType.DANGER,
            }
            
            this.storeNotification.commit(NOTIFY, notification)
            return
            }
               this.$emit('toSaveTask', {
               timeInSeconds: timeElapsed,
               description: this.description,
               project: this.projects.find(proj => proj.id === this.idProject)
            })
            this.description = ''
        }
    },
    setup () {
        const store = useStore(key)
        const storeNotification = anotherStore()
        return {
            projects: computed(() => store.state.projects),
            storeNotification
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