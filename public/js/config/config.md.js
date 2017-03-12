/*
Create app.config module
*/
import routes from './routes'

let configModule = angular.module('app.config', [])
    .config(routes)
    .name

export default configModule
