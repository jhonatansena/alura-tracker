import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore  } from "vuex";

interface State {
    projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [ ]    
    },
    mutations: {
        'ADD_PROJECT'(state, project: IProject) {
            state.projects.push(project)
        },
        'UPDATE_PROJECT'(state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id)
            state.projects[index] = project
        }
    }
})


export const useStore = (): Store<State>  => {
    return vuexUseStore(key)
}

