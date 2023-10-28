<template>
  <main class="columns is-gapless is-multiline " :class="{ 'mode-dark': modeDarkActive }">
    <div class="column is-one-quarter">
        <SideBar @toThemeChanged="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <Notifications></Notifications>
      <router-view></router-view>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import Notifications from './components/Notifications.vue';

export default defineComponent({
    name: 'App',
    data () {
      return {
        modeDarkActive: false,
      }
    },
    // eslint-disable-next-line vue/no-unused-components
    components: { SideBar,  Notifications },
    methods: {
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

