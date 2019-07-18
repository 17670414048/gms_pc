import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
// 测试环境
//axios.defaults.baseURL = 'https://api.wiwcc.com'
axios.defaults.baseURL = 'http://api.tszh.wiwcc.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.withCredentials = true
axios.defaults.headers ={
    source:'Web',
    system:'gms'
    };
Vue.prototype.$axios = axios
Vue.prototype.login = false
Vue.prototype.$bus = new Vue()
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.result == '20009'){
        router.push('/login');
    }
    return response;
  }, function (error) {
 
        error.message = "网络请求失败，请稍后重试";

    // 对响应错误
    return Promise.reject(error);
  });
/**
 * 这里导入组件
 */
const login = () => import('../components/login.vue')
const gmsList = () => import('../components/gms/gmsList.vue')
const challengeList = () => import('../components/challenge/challengeList.vue')
const appointList = () => import('../components/appointment/appointList.vue')
//创建路由对象
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/challengeList'
    },

    {
        path: '/challengeList',
        component: challengeList
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/gmsList',
        component: gmsList
    },
    {
        path: '/appointList',
        component: appointList
    },
        // {
        //     path: '/newsList',
        //     component: newsList,
        //     meta: {
        //        keepAlive: true, //此组件需要被缓存

        //     }
        // },
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    // if (to.path == '/activeVideoPage') {
    //     if (sessionStorage.getItem('userLoginInfo')) {
    //         next();
    //     } else {
    //         router.push('/lessonCollection');
    //     }
    // }
    // console.log(to);
    if (to.path === '/login') {
        Vue.prototype.login = true;
        next()
    } else {
        Vue.prototype.login = false;
        if (sessionStorage.getItem('userinfo')) {
            next()
        } else {
            next('/login')
        }
    }

})

export {
    router
}