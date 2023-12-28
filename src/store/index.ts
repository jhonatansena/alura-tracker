import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore  } from "vuex";
import { NOTIFY, DEFINY_TASK, ADD_TASK_MUTATION, UPDATE_TASK_MUTATION } from "./mutationTypes";
import { INotification } from "@/interfaces/INotification";
import { 
    GET_TASKS, 
    ADD_TASK,
    UPDATE_TASK_ACTION
    } from "./actionTypes";
import clientHttp from "@/http";
import ITask from "@/interfaces/ITask";
import { StateProject, project } from "./module/project";

export interface State {
    project: StateProject
    notifications: INotification[]
    tasks: ITask[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        project: {
            projects: []
        },
        notifications: [],
        tasks: []
    },
    mutations: {
        [UPDATE_TASK_MUTATION](state, updateTask: ITask) {
            const index = state.tasks.findIndex(task => task.id === updateTask.id)
            state.tasks[index] = updateTask
        },
        [NOTIFY](state, newNotification: INotification) {
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        },
    
        [DEFINY_TASK](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK_MUTATION](state, task: ITask) {
            state.tasks.push(task)
        }
    },
    actions: {
        async [GET_TASKS]({ commit }) {
            try {
                const { data } = await clientHttp.get('tasks')

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
    },
    modules: {
        project
    }
})


export const useStore = (): Store<State>  => {
    return vuexUseStore(key)
}

