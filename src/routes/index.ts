import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Task from '../views/Task.vue'

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'task',
    component: Task
}]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router