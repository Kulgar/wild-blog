/*
Create Angular component blogItem into module app.blog with databinding properties
- post : post data for all content
- editable : boolean indicate if this element is editable
*/
let blogItem = {
    bindings: {
        post: "<",
        editable: "<"
    },
    templateUrl: 'js/components/blog/blogItem/blogItem.html',
    controller: ['PostsService', '$stateParams', '$state', function(PostsService, $stateParams, $state) {
        'use  strict'
        let initialPost;

        // Test if $stateParams.id exists (ex: stateParams.id is 1234567 form this url http://domain.ext/1234567)
        if ($stateParams.id) {
            // If $stateParams.id is _new (when you click on add on blogListMenu button see blogListMenu.html)
            if ($stateParams.id === '_new') {
                // Affect post variable with empty object
                this.post = {}
                this.post.isNew = true;
                // Affect editMode property to true
                this.editMode = true
            } else {
                // If $stateParams.id is an id we make HTTP request with this id to get data
                PostsService.getById($stateParams.id).then((res) => {
                    // when this request receives response we affect response data to this controller variable post
                    this.post = res.data;
                    // save into initialPost a copy of this post (used for undo)
                    initialPost = angular.copy(this.post)
                })
            }
        } else {
            //If $stateParams.id doesn't exist we change state to app.blog.list (redirection to list)
            $state.go('blog.list')
        }

        // Create delete function.
        // If you want to use in view you can call with $ctrl.delete()
        this.delete = () => {
            // Call delete method form PostsService with post
            PostsService.delete(this.post).then((res) => {
                // when this request receive response we change state to app.blog.list (redirection to list)
                $state.go('blog.list')
            })
        }

        // Create save function.
        // If you want to use in view you can call with $ctrl.save()
        this.save = () => {
            // Call save method form PostsService with post
            PostsService.save(this.post).then((res) => {
                // Change editMode value to false
                this.editMode = false
                if (!this.post._id) {
                    // if it's new post (when post._id doesn't exist) we affect to post variable response data (post created)
                    this.post = res.data
                }
            })
        }

        // Create undo function.
        // If you want to use in view you can call with $ctrl.undo()
        this.undo = () => {
            if (!this.post.isNew) {
                // Affect initialPost value to post and change editMode to false
                this.post = initialPost
                this.editMode = false
            } else {
                $state.go('blog.list')
            }
        }

        this.isFav = () => {
            if (!this.post) return
            return (this.user.bookmarks.find((post) => post._id === this.post._id))
        }

        this.addOrRemoveToBookmark = () => {
            // Try to find post in bookmarks
            let postFound = this.user.bookmarks.find((post) => post._id === this.post._id)

            if (!postFound) {
                //Not found
                this.user.bookmarks.push(this.post)
            } else {
                //Found
                this.user.bookmarks = this.user.bookmarks.filter((post) => {
                    return post._id !== this.post._id
                })
            }
        }

    }]
}

export default blogItem
