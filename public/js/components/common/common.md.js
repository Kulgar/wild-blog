import navbarComponent from './navbar'

let commonModule = angular.module('app.common', [])
    .component('navbar', navbarComponent)
    .name

export default commonModule
