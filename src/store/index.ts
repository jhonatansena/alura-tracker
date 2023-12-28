import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore  } from "vuex";
import { NOTIFY } from "./mutationTypes";
import { INotification } from "@/interfaces/INotification";
import { StateProject, project } from "./module/project";
import { StateTask, task } from "./module/task";

export interface State {
    project: StateProject
    notifications: INotification[]
    task: StateTask
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        project: {
            projects: []
        },
        notifications: [],
        task: {
            tasks: []
        }
    },
    mutations: {
        [NOTIFY](state, newNotification: INotification) {
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
            }, 3000)
        }
    },
    modules: {
        project,
        task
    }
})


export const useStore = (): Store<State>  => {
    return vuexUseStore(key)
}

