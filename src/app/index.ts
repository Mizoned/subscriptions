import { createApp } from 'vue';
import { router, store, themeOptions } from './providers';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ToastService);
app.use(PrimeVue, themeOptions);

export default app;