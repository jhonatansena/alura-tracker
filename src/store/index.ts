import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

interface State {
    projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [ ]    
    }
})


