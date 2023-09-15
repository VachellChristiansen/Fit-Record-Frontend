import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GymPage from '../views/gym/GymPage.vue'
import GymAdminPage from '../views/gym/admin/GymAdminPage.vue'
import GymAdminLoginPage from '../views/gym/admin/GymAdminLoginPage.vue'

import { BackendGymLink } from '@/Const.js'

const adminMiddleware = async (to, from, next) => {
  const GymLink = new BackendGymLink(to.params.Gym, 'production')
  const url = GymLink.AdminAuthLink()
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: document.cookie.split('=')[1] }),
    credentials: 'include'
  }
  try {
    const response = await fetch(url, options)
    if (response.status == 200) {
      next()
    } else {
      next(`/gym/${to.params.Gym}/admin/login`)
    }
  } catch (error) {
    console.error(error)
  }
}

const gymMiddleware = async (to, from, next) => {
  const GymLink = new BackendGymLink(to.params.Gym, 'production')
  const url = GymLink.BaseLink
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(url, options)
    if (response.status == 200) {
      next()
    } else {
      next('/')
    }
  } catch (error) {
    console.error(error)
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/gym/:Gym',
    name: 'Gym',
    component: GymPage,
    beforeEnter: gymMiddleware
  },
  {
    path: '/gym/:Gym/admin',
    name: 'Admin',
    component: GymAdminPage,
    beforeEnter: [gymMiddleware, adminMiddleware]
  },
  {
    path: '/gym/:Gym/admin/login',
    name: 'AdminLogin',
    component: GymAdminLoginPage,
    beforeEnter: gymMiddleware
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
