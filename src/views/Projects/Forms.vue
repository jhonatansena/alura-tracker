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
import { defineComponent, ref } from 'vue'
import IProject from '../../interfaces/IProject'
import { useStore } from '@/store'
import { ADD_PROJECT_ACTION, UPDATE_PROJECT_ACTION } from '@/store/actionTypes'
import { NotificationType } from '@/interfaces/INotification'
import { notificationMixin } from '@/mixin/notify'
import userNotification from '@/hooks/notify'
import { useRouter } from 'vue-router'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Forms',
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificationMixin],
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const projectName = ref("")
        const { notify } = userNotification()
        const propID = props.id as string

        if (propID) {
            const project = store.state.project.projects.find((project) => project.id === propID)
            projectName.value = project?.name??''
        }

        const save = () => {
            if (propID) {
                try {
                    store.dispatch(UPDATE_PROJECT_ACTION, {
                        id: propID,
                        name: projectName.value
                    })
                    handleWithSuccess('Projeto editado com sucesso!',
                        'Protinho, projeto já está editado!',
                        NotificationType.SUCCESS
                    )
                } catch {
                    notify(
                        'Erro ao editar projeto',
                        'Houve um erro ao tentar editar o projeto. Por favor, tente novamente.',
                        NotificationType.DANGER)
                }
            } else {
                try {
                    const project: IProject={
                        id: new Date().getTime().toString(),
                        name: projectName.value,
                        startDate: formatDate(new Date())
                    };

                    store.dispatch(ADD_PROJECT_ACTION, project)

                    handleWithSuccess(
                        'Novo projecto adicionado',
                        'Prontinho ;) seu projeto já está disponível',
                        NotificationType.SUCCESS
                    );
                } catch {

                    notify(
                        'Erro ao adicionar projeto',
                        'Houve um erro ao tentar adicionar o projeto. Por favor, tente novamente.',
                        NotificationType.DANGER
                    )
                }
            }
        }

        const handleWithSuccess = (title: string, text: string, type: NotificationType) => {
            notify(title, text, type);

            projectName.value = '';
            router.push('/projects');
        }

        const formatDate = (date: Date): string => {
            const day=String(date.getDate()).padStart(2, '0')
            const month=String(date.getMonth()+1).padStart(2, '0')
            const year=date.getFullYear()
            return `${day}/${month}/${year}`
        }

        return {
            save,
            projectName
        }
    }
})
</script>
