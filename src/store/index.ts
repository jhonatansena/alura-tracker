import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore  } from "vuex";
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, NOTIFY } from "./mutationTypes";
import { INotification } from "@/interfaces/INotification";

interface State {
    projects: IProject[]
    notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state, project: IProject) {
            state.projects.push(project)
        },
        [UPDATE_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, projectId) {
            state.projects = state.projects.filter(proj => proj.id !== projectId)
        },
        [NOTIFY](state, newNotification: INotification) {
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        }
    }
})


export const useStore = (): Store<State>  => {
    return vuexUseStore(key)
}

