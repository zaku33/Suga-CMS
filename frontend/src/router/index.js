import Vue from 'vue'
import VueRouter from 'vue-router'

import Analytics from '../components/CMS/Analytics'
import Schedular from '../components/CMS/Schedular'
import Setting from '../components/CMS/Setting'
import AdminDashboard from '../components/CMS/AdminDashboard'
import Login from '../components/Login'
import Register from '../components/Register'


import Page from '../components/Page'
import NotFound from '../components/NotFound'

import Payment from '../components/Payment/Payment'
import History from '../components/Payment/History'
import Swal from 'sweetalert2'

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
          },
          {
            path: 'setting',
            component: Setting
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
    path: '/history',
    name: 'history',
    component: History,
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
  const requireLogin = ['/admin/dashboard', '/admin/dashboard/analytics', '/admin/dashboard/schedular'];
  const publicPage = !requireLogin.includes(to.path);
  const loggedIn = $cookies.get('user')
  if (!publicPage && !loggedIn) {
    return Swal.fire({
      type: "error",
      title: "Access denied!",
      text: "Please login first!"
    }).then(() => {
      next('/admin/login');
    });
  }
  next();
})
export default router
