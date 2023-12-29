import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { Module } from "vuex";
import { DEFINY_TASK, ADD_TASK_MUTATION, UPDATE_TASK_MUTATION } from "@/store/mutationTypes";
import { GET_TASKS, ADD_TASK, UPDATE_TASK_ACTION } from "@/store/actionTypes";
import clientHttp from "@/http";


export interface StateTask {
    tasks: ITask[]
}

export const task: Module<StateTask, State> = {
    state: {
        tasks: []
    },
    mutations: {
        [UPDATE_TASK_MUTATION](state, updateTask: ITask) {
            const index = state.tasks.findIndex(task => task.id === updateTask.id)
            state.tasks[index] = updateTask
        },
        [DEFINY_TASK](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK_MUTATION](state, task: ITask) {
            state.tasks.push(task)
        }
    },
    actions: {
        async [GET_TASKS]({ commit }, filter: string) {
            try {
                const URL = filter ? `tasks?description=${filter}` : 'tasks'
                console.log(URL)
                const { data } = await clientHttp.get(URL)

                commit(DEFINY_TASK, data)
                return data
            } catch {
                throw new Error('Erro ao objter task')
            }
        },
        async [ADD_TASK]({ commit }, task: ITask) {
            try {
                const { data } = await clientHttp.post('/tasks', task)
                commit(ADD_TASK_MUTATION, data)
                return data
            } catch (error) {
                throw new Error('Erro ao adicionar tarefa')
            }
           
        },
        async [UPDATE_TASK_ACTION]({ commit }, task: ITask) {
            try {
                await clientHttp.put(`/tasks/${task.id}`, task)
                commit(UPDATE_TASK_MUTATION, task)
            } catch (error) {
                throw new Error('Erro ao atualizar tarefa')
            }
        }
    }
}