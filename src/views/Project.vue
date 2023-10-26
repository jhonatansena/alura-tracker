<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="project">
        <h1 class="title">Projetos</h1>
        <router-link to="/projects/new" class="button">
            <span>
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
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Project',
    setup () {
        const store = useStore()
        return {
            projects: computed(() => store.state.projects)
        }
    }
})
</script>
<style>
.project {
    padding: 1.25rem;
}
</style>