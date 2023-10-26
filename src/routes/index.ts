import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Task from '../views/Task.vue'
import Project from '../views/Project.vue'
import Forms from '../views/Projects/Forms.vue'

const routes: RouteRecordRaw[]=[
    {
        path: '/',
        name: 'task',
        component: Task
    },
    {
        path: '/projects',
        name: 'projects',
        component: Project
    },
    {
        path: '/projects/new',
        name: 'New projects',
        component: Forms
    },
    {
        path: '/projects/:id',
        name: 'Edit projects',
        component: Forms
    }
]


const router=createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router