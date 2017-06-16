import Vue from 'vue'
import Router from 'vue-router'

import Talk from '@/components/Talk'
import TalkDetail from '@/components/TalkDetail'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'Talk', component: Talk, props: true },
        { path: '/detail/:id', name: 'TalkDetail', component: TalkDetail, props: true }
    ]
})