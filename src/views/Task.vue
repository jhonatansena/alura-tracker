<template>
      <div class="column is-three-quarter content">
        <Forms @toSaveTask="saveTask"/>
        <div class="lista">
          <Task v-for="(task, index) in reverseTasks" :key="index" :task="task"/>
          <Box v-if="emptyList">
          Você não está muito produtivo hoje :(
          </Box>
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