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
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true,
        }
    },
    setup(props, { emit }) {
       const clickedTask = (): void => emit('toclicledTask', props.task)
       return { clickedTask }
    }
})
</script>



<style scoped>
.clickable{
    cursor: pointer;
}
</style>