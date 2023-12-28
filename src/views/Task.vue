<!-- eslint-disable vue/valid-v-model -->
<template>
      <div class="column is-three-quarter content">
        <Forms @toSaveTask="saveTask"/>
        <div class="lista">
          <Task v-for="(task, index) in reverseTasks" :key="index" :task="task" @toclicledTask="handleSelectTask"/>
          <Box v-if="emptyList">
          Você não está muito produtivo hoje :(
          </Box>
        </div>
        <div class="modal" :class="{ 'is-active' :selectedTask }" v-if="selectedTask">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar tarefa</p>
            <button class="delete"  @click="closeModal" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
                <label for="taskDescription" class="label">Descrição da tarefa</label>
                <input type="text" class="input" v-model="selectedTask.description" id="taskDescription">
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" @click="save">Salvar alterações</button>
            <button @click="closeModal" class="button">Cancelar</button>
          </footer>
        </div>
        </div>
      </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Forms from '../components/Forms.vue';
  import Task from '../components/Task.vue';
  import ITask from '../interfaces/ITask'
  import Box from '../components/Box.vue';
  import userNotification from '@/hooks/notify'
import { useStore } from '@/store'
import { GET_TASKS, ADD_TASK, GET_PROJECTS } from '@/store/actionTypes';
import { NotificationType } from '@/interfaces/INotification';

  
  export default defineComponent({
      name: 'App',
      // eslint-disable-next-line vue/no-unused-components
      components: { Forms, Task, Box },
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
        handleSelectTask(task: ITask) {
          this.selectedTask = task
        },closeModal() {
          this.selectedTask = null
        }
      },
      setup () {
        const store = useStore()

        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        const { notify } = userNotification()
         return {
            tasks: computed(() => store.state.tasks),
            store,
            notify
        }
      }
  });

  </script>