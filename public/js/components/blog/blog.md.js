/*
Create Angular module app.blog and define all states
blog : parent state, is an abstrat state too with templateUrl
blog.list : nested state of state app.blog, display blog-list component
blog.item : nested state of state app.blog, display blog-item component with editable attribute value is true
*/
import blogItem from './blogItem/blogItem'
import blogItemMenu from './blogItem/blogItemMenu'
import blogList from './blogList/blogList'

let blogModule = angular.module('app.blog', [])
    .component('blogItem', blogItem)
    .component('blogItemMenu', blogItemMenu)
    .component('blogList', blogList)
    .config(['$stateProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
        /*
          Define a state with name 'blog' this state is abstract and url is empty (root of application)
          template is ui-view it's used to display nested views
        */
        $stateProvider
            .state('blog', {
                url: '/posts',
                abstract: true,
                templateUrl: 'js/components/blog/blog.html'
            })
            .state('blog.list', {
                url: '/',
                template: '<blog-list></blog-list>'
            })
            .state('blog.item', {
                url: '/:id',
                template: '<blog-item editable="true"></blog-item>'
            })
    }])
    .name

export default blogModule
