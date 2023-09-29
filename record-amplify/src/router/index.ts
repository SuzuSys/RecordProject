import { createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'DashboardView' },
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/account',
      name: 'AccountView',
      component: () => import('@/views/AccountView.vue'),
    },
    {
      path: '/recovery',
      name: 'RecoveryView',
      component: () => import('@/views/RecoveryView.vue'),
    },
    {
      path: '/setup',
      name: 'SetupIOSView',
      component: () => import('@/views/SetupIOSView.vue'),
    },
  ],
});

export default router;