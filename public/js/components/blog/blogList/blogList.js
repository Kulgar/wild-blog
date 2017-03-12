/*
Create Angular component blogList into module app.blog
*/
let blogList = {
    templateUrl: 'js/components/blog/blogList/blogList.html',
    controller: ['PostsService', function(PostsService) {
        'use strict'
        // Define startIndex variable with default value 3
        this.startIndex = 3

        // Call get() method from PostsService.
        // When this request receive response we affect response data to this controller variable posts
        PostsService.get().then((res) => {
            this.posts = res.data
        }).catch((err) => {
            this.posts = [{
                title: "Hello There", 
                content: "I am an intersting article. There was an error by the way because API doesn't exist yet"
            }  ]
        })

        // Create loadMore function.
        // If you want to use in view, you can call with $ctrl.loadMore()
        this.loadMore = () => {
            // Add 3 to startIndex
            this.startIndex += 3
        }

    }]
}

export default blogList
