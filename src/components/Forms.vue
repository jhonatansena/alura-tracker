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
import { computed, defineComponent, ref } from 'vue'
import PlaybackControls from './PlaybackControls.vue'
import { useStore } from 'vuex'
import  { key } from '@/store'
import {  NotificationType } from '@/interfaces/INotification'
import userNotification from '@/hooks/notify'
import ITask from '@/interfaces/ITask'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Forms',
    emits: ['toSaveTask'],
    components: {
        PlaybackControls
    },
    methods: {
        
    },
    setup (_, { emit }) {
        const store = useStore(key)
        
        const description = ref("")
        const idProject = ref("")

        const projects = computed(() => store.state.project.projects)
        const { notify } = userNotification()

        const finishTask = (timeElapsed: number): void => {
            const project = projects.value.find((p) => p.id == idProject.value)

            if (!project) {
            notify(
                'Erro ao adicionar projeto', 
                'Ops!!! Você precisa escolher um projeto antes de finalizar uma tarefa',
                NotificationType.DANGER
                )
            return
            }

    
            const task: ITask = {
                id: Math.random() * (10000000 - 1) + 1,
                timeInSeconds: timeElapsed,
                description: description.value,
                project
            }
               emit('toSaveTask', task)
            description.value = ''
        }

        return {
            description,
            idProject,
            projects,
            finishTask,
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