import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { Module } from "vuex";
import { 
    ADD_PROJECT, 
    UPDATE_PROJECT, 
    DEFINY_PROJECTS, 
    DELETE_PROJECT, 
    } from "@/store/mutationTypes";
    import { 
        GET_PROJECTS, 
        ADD_PROJECT_ACTION, 
        DELETE_PROJECT_ACTION, 
        UPDATE_PROJECT_ACTION,
        } from "@/store/actionTypes";
import clientHttp from "@/http";

export interface StateProject {
    projects: IProject[]
}

export const project: Module<StateProject, State> = {
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
        [DEFINY_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
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
        async [ADD_PROJECT_ACTION](context, project: IProject) {
            try {
                const { data } = await clientHttp.post('/projects', project)
                return data
            } catch (error) {
                throw new Error('Erro ao adicionar projeto')
            }
           
        },
        async [UPDATE_PROJECT_ACTION](context, project: IProject) {
            try {
                const { data } = await clientHttp.patch(`/projects/${project.id}`, project)
                return data
            } catch (error) {
                throw new Error('Erro ao adicionar projeto')
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
}