import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore  } from "vuex";
import { 
    ADD_PROJECT, 
    UPDATE_PROJECT, 
    NOTIFY, 
    DEFINY_PROJECTS, 
    DELETE_PROJECT, 
    DEFINY_TASK, 
    ADD_TASK_MUTATION,
    UPDATE_TASK_MUTATION
    } from "./mutationTypes";
import { INotification } from "@/interfaces/INotification";
import { 
    GET_PROJECTS, 
    ADD_PROJECT_ACTION, 
    DELETE_PROJECT_ACTION, 
    UPDATE_PROJECT_ACTION,
    GET_TASKS, 
    ADD_TASK,
    UPDATE_TASK_ACTION
    } from "./actionTypes";
import clientHttp from "@/http";
import ITask from "@/interfaces/ITask";

interface State {
    projects: IProject[]
    notifications: INotification[]
    tasks: ITask[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: [],
        tasks: []
    },
    mutations: {
        [ADD_PROJECT](state, project: IProject) {
            state.projects.push(project)
        },
        [UPDATE_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id)
            state.projects[index] = project
        },
        [UPDATE_TASK_MUTATION](state, updateTask: ITask) {
            const index = state.tasks.findIndex(task => task.id === updateTask.id)
            state.tasks[index] = updateTask
        },
        [DELETE_PROJECT](state, projectId) {
            state.projects = state.projects.filter(proj => proj.id !== projectId)
        },
        [NOTIFY](state, newNotification: INotification) {
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        },
        [DEFINY_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
        [DEFINY_TASK](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASK_MUTATION](state, task: ITask) {
            state.tasks.push(task)
        }
    },
    actions: {
        async [GET_PROJECTS]({ commit }) {
            try {
                const { data } = await clientHttp.get('projects')

                commit(DEFINY_PROJECTS, data)
                return data
            } catch {
                throw new Error('Erro ao objter projetos')
            }
        },
        async [GET_TASKS]({ commit }) {
            try {
                const { data } = await clientHttp.get('tasks')

                commit(DEFINY_TASK, data)
                return data
            } catch {
                throw new Error('Erro ao objter task')
            }
        },
        async [ADD_PROJECT_ACTION](context, project: IProject) {
            try {
                const { data } = await clientHttp.post('/projects', project)
                return data
            } catch (error) {
                throw new Error('Erro ao adicionar projeto')
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
        async [UPDATE_PROJECT_ACTION](context, project: IProject) {
            try {
                const { data } = await clientHttp.put(`/projects/${project.id}`, project)
                return data
            } catch (error) {
                throw new Error('Erro ao adicionar projeto')
            }
           
        },
        async [UPDATE_TASK_ACTION]({ commit }, task: ITask) {
            try {
                await clientHttp.put(`/tasks/${task.id}`, task)
                commit(UPDATE_TASK_MUTATION, task)
            } catch (error) {
                throw new Error('Erro ao atualizar tarefa')
            }
        },
        async [DELETE_PROJECT_ACTION]({ commit }, projectId: number) {
            try {
                await clientHttp.delete(`/projects/${projectId}`)
                commit(DELETE_PROJECT, projectId)
            } catch (error) {
                throw new Error('Erro ao deletar projeto')
            }
        }
    }
})


export const useStore = (): Store<State>  => {
    return vuexUseStore(key)
}

