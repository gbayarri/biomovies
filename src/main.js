import { createApp } from 'vue'

// import PrimeVue and components
import PrimeVue from 'primevue/config'
import OrderList from 'primevue/orderlist'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Inplace from 'primevue/inplace'
import SpeedDial from 'primevue/speeddial'

import App from '@/App.vue'
import router from '@/router'

// import PrimeVue resources
import 'primevue/resources/themes/saga-blue/theme.css'      
import 'primevue/resources/primevue.min.css'                
import 'primeicons/primeicons.css'                          
import 'primeflex/primeflex.css'
// import font awesome
import '@fortawesome/fontawesome-free/css/all.min.css'
// main css
import '@/css/main.css'
// package properties
import { name, version } from '../package.json';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {ripple: true})

// create global components
app.component('OrderList', OrderList)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Inplace', Inplace)
app.component('SpeedDial', SpeedDial)

//mount app
app.mount('#app')
// provide / inject globally modules
app.provide('$router', router)
// provide / inject globally variables
app.provide('$app_name', name)
app.provide('$app_version', version)
