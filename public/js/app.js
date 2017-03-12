/*
This file is the entry point of Angular application.
There are all depedencies (module)
*/
import other from '../scss/other.scss'
import style from '../scss/style.scss' //require style

import angular from 'angular'
import angularUIRouter from 'angular-ui-router'
import angularMaterialize from 'angular-materialize'

import config from './config/config.md'
import services from './services/services.md'
import common from './components/common/common.md'
import blog from './components/blog/blog.md'

console.log("In app.js")
console.log(services)

angular.module('app', [
    angularUIRouter,
    angularMaterialize,
    config,
    services,
    common,
    blog
])
