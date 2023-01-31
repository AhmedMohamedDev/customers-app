require('./bootstrap');
import { createApp } from 'vue';
// import { ElNotification } from 'element-plus'
// import { store } from './store/store.js'
// //import { action } from './store/action.js'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'


    // import ExampleComponent from './components/ExampleComponent.vue';
    // import StudentFormComponent from './components/student/StudentFormComponent.vue';
    import ExampleComponent from './components/ExampleComponent.vue';



let app=createApp({});

app.component('example-component' , ExampleComponent);
// app.component('student-form-component' , StudentFormComponent);
// app.component('student-list-component',StudentListComponent);

// const { appContext } = createApp()
// ElNotification({}, appContext)

// app.use(ElementPlus).use(store);


app.mount("#app")