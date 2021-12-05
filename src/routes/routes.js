import VueRouter from 'vue-router';
import AppFalcone from '../pages/AppFalcone';
import LandingPage from '../pages/LandingPage';
import SearchStatus from '../pages/SearchStatus';

const router = new VueRouter({
  routes: [
    {
      component: AppFalcone,
      name: 'AppFalcone',
      path: '/home',
      props: true,
    },
    {
      component: SearchStatus,
      name: 'SearchStatus',
      path: '/result',
      props: true,
    }
  ]
});

export default router;
