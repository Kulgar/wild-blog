/*
This file is the entry point of Angular application.
There are all depedencies (module)
*/
import other from '../scss/other.scss'
import style from '../scss/style.scss' //require style

import angular from 'angular'
import angularUIRouter from 'angular-ui-router'
import angularMaterialize from 'angular-materialize'

angular.module('app', [
    angularUIRouter,
    angularMaterialize
])
