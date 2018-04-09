import Vue from 'vue';
import Router from 'vue-router';
import iView from '../pulgins/iview';
import {LoadingBar, Message} from 'iview';
import 'iview/dist/styles/iview.css';
import TaskList from '@/pages/TaskList';
import Login from '@/pages/Login';
import Register from '@/pages/Register1';
import {Request} from 'terrible-utils';
Vue.use(Router);
Vue.use(iView);
Vue.prototype.$Message = Message;
Vue.prototype.$request = new Request({
  baseURL: "http://openapi.zhoufeifan.tech",
  // baseURL: "http://localhost:3001",
  onLoadingStart: () => {
    LoadingBar.start({
      content: 'Loading...',
      duration: 0
    });
  },
  onLoadingEnd: () => {
    LoadingBar.finish({
      content: 'Loading...',
      duration: 0
    });
  },
  onError: (error) => {
    if (error && error.errorMsg) {
      Message.error(error.errorMsg);
    } else {
      Message.error(error || "未知错误");
    }
  }
});
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/taskList',
      name: 'TaskList',
      component: TaskList
    }
  ]
})
