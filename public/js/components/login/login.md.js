import accountComponent from './account'
import loginComponent from './login'
import connectComponent from './connect'

let loginModule = angular.module('app.login', [])
    .component('account', accountComponent)
    .component('login', loginComponent)
    .component('connect', connectComponent)
    .config(['$stateProvider', ($stateProvider) => {
        'use strict'
        $stateProvider
            .state('app.login', {
                url: '',
                abstract: true,
                template: '<login></login>'
            })
            .state('app.login.connect', {
                url: '/login',
                template: '<connect></connect>'
            })
            .state('app.login.create', {
                url: '/new/account',
                template: '<account></account>'
            })
    }])
    .name

export default loginModule
