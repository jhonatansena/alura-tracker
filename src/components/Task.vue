<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Box>
        <div class="columns clickable" @click="clickedTask">
            <div class="column is-7">
                {{ task.description.trim().length !== 0 ? task.description : 'Sem descrição' }}
            </div>
            <div class="column is-3">
                {{ task.project?.name ?? 'N/D' }}
            </div>
            <div class="column">
                <Timer :timeInSeconds="task.timeInSeconds"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import Timer from './Timer.vue'
import ITask from '../interfaces/ITask';
import Box from './Box.vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Task',
    emits: ['toclicledTask'],
    components: {
        Timer, 
        Box
    },
    methods: {
        clickedTask(): void {
            this.$emit('toclicledTask', this.task)
        }
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true,
        }
    }
})
</script>



<style scoped>
.clickable{
    cursor: pointer;
}
</style>