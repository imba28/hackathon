import Vue from 'vue'
import App from './App'
import auth from '@/auth'
import router from './router'
import Buefy from 'buefy'

import Vue2TouchEvents from 'vue2-touch-events'

import 'buefy/lib/buefy.css'
import '@/sass/template.scss'

Vue.config.productionTip = true
Vue.use(Buefy);

Vue.use(Vue2TouchEvents, {
    disableClick: false,
    touchClass: '',
    tapTolerance: 10,
    swipeTolerance: 30,
    longTapTimeInterval: 400
})

/*Touch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2
})
Vue.use(Touch)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    props: {
        transitionName: 'page-right'
    },
    data: {
        show: '',
        isSignedIn: false,
        user: null,
    },
    components: {
        App
    },
    template: '<App/>',
    created: () => { // Beim ersten Laden der Seite prüfen, ob aus dem sessionStorage ein User ausgelesen wurde und falls vorhanden globalen Status setzen.
        if(auth.isSignedIn() && !this.isSignedIn) {
            router.app.user = auth.getUser()
            router.app.isSignedIn = true
        }
    }
})

