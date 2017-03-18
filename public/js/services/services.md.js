/*
Create app.service module
*/
import postsService from './postsService'
import usersService from './usersService'

let servicesModule = angular.module('app.services', [])
    .service('PostsService', postsService)
    .service('UsersService', usersService)
    .name

export default servicesModule
