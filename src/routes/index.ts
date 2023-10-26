import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Task from '../views/Task.vue'
import Projects from '../views/Projects.vue'
import List from '../views/List.vue'
import Forms from '../views/Projects/Forms.vue'

const routes: RouteRecordRaw[]=[
    {
        path: '/',
        name: 'task',
        component: Task
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {
                path: '',
                name: 'projects',
                component: List
            },
            {
                path: 'new',
                name: 'New projects',
                component: Forms
            },
            {
                path: ':id',
                name: 'Edit projects',
                component: Forms,
                props: true
            }
        ]
    }
]


const router=createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router