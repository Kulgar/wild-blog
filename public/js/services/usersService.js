export default ['$http', '$cookies', '$window', '$q', class UsersService {

    constructor($http, $cookies, $window, $q) {
        this.$http = $http
        this.$cookies = $cookies
        this.$window = $window
        this.$q = $q
        this.currentUser = null
    }

    create(user) {
        return this.$http.post('/api/users', user)
    }

    update(user) {
        return this.$http.put('/api/users/' + user._id, user)
    }

}]
