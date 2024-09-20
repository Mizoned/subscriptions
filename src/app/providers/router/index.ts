import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth as boolean;
  const isAuth: boolean = !!localStorage.getItem('accessToken');

  if (requiresAuth && !isAuth) {
    next({ name: 'signin' });
  } else if (!requiresAuth && isAuth) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export { router };
