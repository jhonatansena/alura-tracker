<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="project">
        <h1 class="title">Projeto</h1>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit" style="background-color: darkblue; color: white; font-weight: bolder;">
                    salvar
                </button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr >
                    <th> ID </th>
                    <th> NOME </th>
                    <th>DATA DE INÍCIO</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{  project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td> {{ project.startDate }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IProject from '../interfaces/IProject'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Project',
    data() {
        return {
            projectName: "",
            projects: [] as IProject[]
        }
    },
    methods: {
        save() {
            const project: IProject={
                id: new Date().getTime().toString(),
                name: this.projectName,
                startDate: this.formatDate(new Date())
            }

            this.projects.push(project)
            this.projectName=''
        },
        formatDate(date: Date): string {
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
         }
    }
})
</script>
<style>
.project {
    padding: 1.25rem;
}
</style>