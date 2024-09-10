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
      }
    ]
  }
]