import {createRouter, createWebHistory} from 'vue-router'
import landings from './landings/landings'

const routes = [
    ...landings,
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
