/*
Create app.service module
*/
import postsService from './postsService'

let servicesModule = angular.module('app.services', [])
    .service('PostsService', postsService)
    .name

console.log(servicesModule);

export default servicesModule
