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
  ],
});

export default router;