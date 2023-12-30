<!-- eslint-disable vue/valid-v-model -->
<template>
      <div class="column is-three-quarter content">
        <Forms @toSaveTask="saveTask"/>
        
        <div class="lista">
           <Box v-if="emptyList">
          Você não está muito produtivo hoje :(
          </Box>
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Digite para filtrar" v-model="filter">
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <br>
            <Task v-for="(task, index) in reverseTasks" :key="index" :task="task" @toclicledTask="handleSelectTask"/>
        </div>
        <Modal :show="!!selectedTask">
          <template v-slot:header>
            <p class="modal-card-title">Editar tarefa</p>
            <button class="delete"  @click="closeModal" aria-label="close"></button>
          </template>
          <template v-slot:body>
            <div class="field">
                <label for="taskDescription" class="label">Descrição da tarefa</label>
                <input type="text" class="input" v-if="selectedTask" v-model="selectedTask.description" id="taskDescription">
            </div>
          </template>
          <template v-slot:footer>
            <button @click="updateTask" class="button is-success" >Salvar alterações</button>
            <button @click="closeModal" class="button">Cancelar</button>
          </template>
        </Modal>
      </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref, watchEffect } from 'vue';
  import Forms from '../components/Forms.vue';
  import Task from '../components/Task.vue';
  import ITask from '../interfaces/ITask'
  import Box from '../components/Box.vue';
  import userNotification from '@/hooks/notify'
import { useStore } from '@/store'
import { GET_TASKS, ADD_TASK, GET_PROJECTS, UPDATE_TASK_ACTION } from '@/store/actionTypes';
import { NotificationType } from '@/interfaces/INotification';
import Modal from '@/components/Modal.vue';

  
  export default defineComponent({
      name: 'App',
      // eslint-disable-next-line vue/no-unused-components
      components: { Forms, Task, Box, Modal },
      data () {
        return {
          selectedTask: null as ITask | null  
        }
      },
      computed: {
        emptyList (): boolean {
          return this.tasks.length === 0
        },
        reverseTasks (): ITask[] {
            return this.tasks.slice().reverse()
        }
      },
      methods: {
         saveTask(task: ITask) {
            if (!task.description) {
            this.notify(
                'Descrição faltando', 
                'OPs!!! Você precisa informar um descrição para a tarefa',
                NotificationType.WARNING
                )
            return
          }
         this.store.dispatch(ADD_TASK, task)
        },
        updateTask() {
          try {
            this.store.dispatch(UPDATE_TASK_ACTION, this.selectedTask)
          this.notify(
                'Atualizado com sucesso!', 
                'Tarefa atualizada com sucesso!',
                NotificationType.SUCCESS
                )
          this.closeModal()
          } catch (error) {
            this.notify(
              'Erro ao atualizar!',
              'Erro ao atualizar tarefa',
              NotificationType.DANGER
            )
          }
        },
        handleSelectTask(task: ITask) {
          this.selectedTask = task
        },closeModal() {
          this.selectedTask = null
        }
      },
      setup () {
        const store = useStore()
        const { notify } = userNotification()
        const tasks = computed(() => 
        store.state.task.tasks)

        const filter = ref('')

        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)

        watchEffect(() => {
          store.dispatch(GET_TASKS, filter.value)
        })

         return {
            tasks,
            store,
            notify,
            filter
        }
      }
  });

  </script>