/*
Create Angular service PostsService in app.services module
*/
export default ['$http', class PostsService {

    constructor($http) {
        this.$http = $http
    }

    get() {
        // HTTP Request method GET to our express API
        return this.$http.get('/api/posts')
    }
    getById(id) {
        // HTTP Request method GET with param (post id) to our express API
        return this.$http.get('/api/posts/' + id)
    }
    save(post) {
        if (post._id) {
            // HTTP Request method PUT (update) with param and data (post) to our express API
            return this.$http.put('/api/posts/' + post._id, post)
        } else {
            // HTTP Request method POST (create) with data (post) to our express API
            return this.$http.post('/api/posts', post)
        }
    }
    delete(post) {
        // HTTP Request method DELETE (delete) with param (post id) to our express API
        return this.$http.delete('/api/posts/' + post._id)
    }

}]
