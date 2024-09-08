import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/dashboard'),
      }
    ]
  }
]