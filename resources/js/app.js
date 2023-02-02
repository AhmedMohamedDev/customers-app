require('./bootstrap');
import { createApp } from 'vue';
import { store } from './store'


// Load Componenets
import CustomerComponent from './components/customer/CustomerComponent.vue';
import LoginComponent from './Pages/Auth/Login.vue';




let app=createApp({});

// Register Componenets
app.component('customer-component' , CustomerComponent);
app.component('LoginComponent' , LoginComponent);



app.use(store);
app.mount("#app")