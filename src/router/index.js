import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from "@/views/CreateView";
import Questions from "@/views/Questions"
import Responses from "@/views/Responses";
import ResponseDetails from "@/views/ResponseDetails";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create/:id',
    name: 'create',
    component: CreateView
  },
  {
    path: '/questions/:id',
    name: 'questions',
    component: Questions,
  },
  {
    path: '/responses/:id',
    name: 'responses',
    component: Responses,
  },
  {
    path: '/response-details/:question_id/:id',
    name: 'responseDetails',
    component: ResponseDetails,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
