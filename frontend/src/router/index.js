import Vue from 'vue'
import VueRouter from 'vue-router'

import Analytics from '../components/CMS/Analytics'
import Schedular from '../components/CMS/Schedular'
import AdminDashboard from '../components/CMS/AdminDashboard'
import Login from '../components/Login'
import Register from '../components/Register'
import Page from '../components/Page'
import NotFound from '../components/NotFound'

import Payment from '../components/Payment/Payment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: Page,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
        children: [
          {
            path: 'analytics',
            component: Analytics
          },
          {
            path: 'schedular',
            component: Schedular
          }
        ]
      },
      {
        path: 'login',
        component: Login
      }, {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  const requireLogin = ['/admin/dashboard','/admin/dashboard/analytics','/admin/dashboard/schedular'];
  const publicPage = !requireLogin.includes(to.path);
  const loggedIn = $cookies.get('user')
  if (!publicPage && !loggedIn) {
    alert('Please Login first')
    return next('/admin/login');
  }
  next();
})
export default router
