import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Task from '../views/Task.vue'
import Project from '../views/Project.vue'

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
]


const router=createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router