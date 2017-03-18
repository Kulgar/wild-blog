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

    connect(data) {
        return new Promise((resolve, reject) => {
            this.$http.post('/api/auth', data).then((res) => {
                this.currentUser = res.data.user
                this.$cookies.put('token', res.data.token)
                resolve(res.data.user)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.$cookies.remove("token")
            this.currentUser = null
            resolve()
        })
    }

    setToken(token) {
        return new Promise((resolve, reject) => {
            this.$cookies.put('token', token)
            let payload = token.split('.')[1]
            payload = this._decodePayload(payload)
            this.currentUser = payload._doc
            resolve(this.currentUser)
        })
    }

    getCurrent() {
        let deferred = this.$q.defer()
        if (!this.$cookies.get('token')) {
            deferred.reject()
        } else {
            if (!this.currentUser) {
                let payload = this.$cookies.get('token').split('.')[1]
                payload = this._decodePayload(payload)
                this.currentUser = payload._doc
                if (Math.round(new Date().getTime() / 1000) > payload.exp)
                    return this.disconnect()
            }
            deferred.resolve(this.currentUser)
        }

        return deferred.promise
    }

    //Private methods
    _decodePayload(payload) {
        return JSON.parse(decodeURI(this._base64ToUTF8(this._urlBase64Decode(payload))))
    }

    _base64ToUTF8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    _urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        //return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        return output
    }

}]
