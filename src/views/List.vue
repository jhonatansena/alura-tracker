<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section>
        <router-link to="/projects/new" class="button">
            <span class="icon is-small">
                 <i class="fas fa-plus"></i>
            </span>
            <span>Novo Projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr >
                    <th> ID </th>
                    <th> NOME </th>
                    <th>DATA DE INÍCIO</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{  project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td> {{ project.startDate }}</td>
                    <td> 
                        <router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>

                            </span>

                        </router-link>
                        <button class="button ml-2 is-danger" @click="remove(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { DELETE_PROJECT } from '@/store/mutationTypes'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'List',
    methods: {
        remove (projectId: string) {
            this.store.commit(DELETE_PROJECT, projectId)
        }
    },
    setup () {
        const store = useStore()
        return {
            projects: computed(() => store.state.projects),
            store,
        }
    }
})
</script>
