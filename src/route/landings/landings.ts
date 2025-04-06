import type {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Landing',
        component: () => import('../../pages/landings/index.vue')
    }
]

export default routes
