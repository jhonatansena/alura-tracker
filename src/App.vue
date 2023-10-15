<template>
  <main class="columns is-gapless is-multiline " :class="{ 'mode-dark': modeDarkActive }">
    <div class="column is-one-quarter">
        <SideBar @toThemeChanged="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <Forms @toSaveTask="saveTask"/>
      <div class="lista">
        <Task v-for="(task, index) in tasks" :key="index" :task="task"/>
        <Box v-if="emptyList">
        Você não está muito produtivo hoje :(
        </Box>
      </div>
      
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import Forms from './components/Forms.vue';
import Task from './components/Task.vue';
import ITask from './interfaces/ITask'
import Box from './components/Box.vue';

export default defineComponent({
    name: 'App',
    data () {
      return {
        tasks: [] as ITask [],
        modeDarkActive: false,
      }
    },
    // eslint-disable-next-line vue/no-unused-components
    components: { SideBar, Forms, Task, Box },
    computed: {
      emptyList (): boolean {
        return this.tasks.length === 0
      }
    },
    methods: {
      saveTask(task: ITask): void {
        this.tasks.push(task)
      },
      changeTheme (modeDarkActive: boolean): void {
          this.modeDarkActive = modeDarkActive
      }
    }
});
</script>

<style>
  .lista{
    padding: 1.25rem;
  }
  main {
    --bg-primary: #fff;
    --text-primary: #000;
  }
  main.mode-dark {
    --bg-primary: #2b2d42;
    --text-primary: #ddd;
  }
  .content {
    background-color: var(--bg-primary);
  }
 
</style>

