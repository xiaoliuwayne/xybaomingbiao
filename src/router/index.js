import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import PeopleList from '../components/PeopleList.vue'
import Manager from '../components/Manager.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/peoplelist',
    name: 'PeopleList',
    component: PeopleList
  },
  {
    path:'/manager/:a_id',
    name:'Manager',
    component:Manager
  },
  {
    path:'/login/:a_id',
    name:'Login',
    component:Login
  }
];

export default new Router({
  routes: routes
})
