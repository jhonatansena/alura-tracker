import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

interface State {
    projects: IProject[]
}

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
 }

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [
            {
                id: new Date().getTime().toString(),
                name: 'Typescript',
                startDate: formatDate(new Date())
            },
            {
                id: new Date().getTime().toString(),
                name: 'Vue',
                startDate: formatDate(new Date())
            },

            {
                id: new Date().getTime().toString(),
                name: 'Vuex',
                startDate: formatDate(new Date())
            },

        ]    
    }
})


