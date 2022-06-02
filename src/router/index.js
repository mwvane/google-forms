import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from "@/views/CreateView";
import Questions from "@/views/Questions"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/questions/:id',
    name: 'questions',
    component: Questions,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
