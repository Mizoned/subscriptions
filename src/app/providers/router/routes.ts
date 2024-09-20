import type { RouteRecordRaw } from 'vue-router';
import { AppLayout } from '@/widgets/layouts/app-layout';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/dashboard')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/settings')
      }
    ]
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: () => import('@/pages/sign-up')
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('@/pages/sign-in')
  }
];
