import Vue from 'vue'
import Router from 'vue-router'

import Talk from '@/components/Talk'
import TalkDetail from '@/components/TalkDetail'
import Todos from '@/components/Todos'
import Charts from '@/components/Chart'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'Talk', component: Talk, props: true },
        { path: '/detail/:id', name: 'TalkDetail', component: TalkDetail, props: true },
        { path: '/Todos', name: 'Todos', component: Todos },
        { path: '/Charts', name: 'Charts', component: Charts },
    ]
})