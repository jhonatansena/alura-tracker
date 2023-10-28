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
  import { defineComponent } from 'vue';
  import Forms from '../components/Forms.vue';
  import Task from '../components/Task.vue';
  import ITask from '../interfaces/ITask'
  import Box from '../components/Box.vue';
  import userNotification from '@/hooks/notify'
import { NotificationType } from '@/interfaces/INotification';

  
  export default defineComponent({
      name: 'App',
      data () {
        return {
          tasks: [] as ITask [],
          modeDarkActive: false,
        }
      },
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
        saveTask(task: ITask): void {
          if (!task.description) {
            this.notify(
                'Descrição faltando', 
                'OPs!!! Você precisa informar um descrição para a tarefa',
                NotificationType.WARNING
                )
            return
          }
          this.tasks.push(task)
        },
      },
      setup () {
        const { notify } = userNotification()
        return {
          notify
        }
      }
  });

  </script>