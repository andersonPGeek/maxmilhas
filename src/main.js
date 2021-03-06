import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const SearchCpf = require('./assets/js/components/search-cpf.vue');

const routes = [
    {
        name: 'search_cpf',
        path: '/',
        component: SearchCpf
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');