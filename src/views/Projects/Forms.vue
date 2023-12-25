<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section>
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
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IProject from '../../interfaces/IProject'
import { useStore } from '@/store'
import { UPDATE_PROJECT } from '@/store/mutationTypes'
import { ADD_PROJECT_ACTION } from '@/store/actionTypes'
import { NotificationType } from '@/interfaces/INotification'
import { notificationMixin } from '@/mixin/notify'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Forms',
    data() {
        return {
            projectName: ""
        }
    },
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificationMixin],
    mounted() {
        if (this.id) {
            const project=this.store.state.projects.find((project) => project.id===this.id)
            this.projectName=project?.name??''
        }
    },
    methods: {
        async save() {
            if (this.id) {
                this.store.commit(UPDATE_PROJECT, {
                    id: this.id,
                    name: this.projectName
                })
            } else {
                try {
        const project: IProject = {
            id: new Date().getTime().toString(),
            name: this.projectName,
            startDate: this.formatDate(new Date())
        };

        await this.store.dispatch(ADD_PROJECT_ACTION, project)

        this.notify(
            'Novo projecto adicionado',
            'Prontinho ;) seu projeto já está disponível',
            NotificationType.SUCCESS
        );

        this.projectName = '';
        this.$router.push('/projects');
    } catch (error) {

        this.notify(
            'Erro ao adicionar projeto',
            'Houve um erro ao tentar adicionar o projeto. Por favor, tente novamente.',
            NotificationType.DANGER
        )
    }
    }
    },
    formatDate(date: Date): string {
        const day=String(date.getDate()).padStart(2, '0')
        const month=String(date.getMonth()+1).padStart(2, '0')
        const year=date.getFullYear()
        return `${day}/${month}/${year}`
    }
    },
    setup() {
        const store=useStore()
        return {
            store,
        }
    }
})
</script>
