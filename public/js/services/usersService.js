export default ['$http', '$cookies', '$window', '$q', class UsersService {

    constructor($http, $cookies, $window, $q) {
        this.$http = $http
        this.$cookies = $cookies
        this.$window = $window
        this.$q = $q
        this.currentUser = null
    }

    saveToken(token) {
        //console.log(token)
        this.$cookies.put('blog-token', token)
    }

    getToken() {
        //console.log(this.$cookies.getAll())
        return this.$cookies.get('blog-token')
    }

    removeToken() {
        return this.$cookies.remove('blog-token')
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
                let token = res.data.token
                let payload = token.split('.')[1]
                this.saveToken(token)
                payload = this._decodePayload(payload)
                this.currentUser = payload
                resolve(this.currentUser)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.removeToken()
            this.currentUser = null
            resolve()
        })
    }

    setToken(token) {
        return new Promise((resolve, reject) => {
            this.saveToken(token)
            let payload = token.split('.')[1]
            payload = this._decodePayload(payload)
            this.currentUser = payload
            resolve(this.currentUser)
        })
    }

    getCurrent() {
        let deferred = this.$q.defer()
        if (!this.getToken()) {
            deferred.reject()
        } else {
            if (!this.currentUser) {
                let payload = this.getToken().split('.')[1]
                //console.log(payload)
                payload = this._decodePayload(payload)
                this.currentUser = payload
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
