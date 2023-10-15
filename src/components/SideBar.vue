<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo Alura Tracker">
        </h1>
        <button class="button" @click="changeTheme">
            {{  buttonText }}
        </button>
    </header>
</template>

<script lang="ts">
 import { defineComponent} from 'vue'
  export default defineComponent({
    name: 'App',
    emits: ['toThemeChanged'],
    data () {
        return {
            modeDarkActive: false
        }
    },
    computed: {
        // eslint-disable-next-line vue/return-in-computed-property
        buttonText () {
            if (this.modeDarkActive) {
                return 'Desativar modo escuro'
            }
            return 'Ativar modo escuro'
        }
    },
    methods: {
        changeTheme () {
            this.modeDarkActive = !this.modeDarkActive
            this.$emit('toThemeChanged', this.modeDarkActive)
        }
    }
  })
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align:center;
}
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

</style>