import type {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Landing',
        component: () => import('../../pages/landings/index.vue')
    },
    {
        path: '/docs',
        name: 'Docs',
        component: () => import('../../pages/docs/index.vue')
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../../pages/signup/index.vue')
    }
]

export default routes
