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
        component: () => import('@/pages/dashboard'),
        meta: { requiresAuth: true }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/settings'),
        meta: { requiresAuth: true }
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('@/pages/notifications'),
        meta: { requiresAuth: true }
      },
      {
        path: '/services',
        name: 'services',
        component: () => import('@/pages/services'),
        meta: { requiresAuth: true }
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
