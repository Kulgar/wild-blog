let connect = {
    templateUrl: 'js/components/login/connect.html',
    controller: ['UsersService', '$state', function(UsersService, $state) {
        'use strict'
        let $ctrl = this
        angular.extend(this, {
            connect() {
                UsersService.connect($ctrl.user).then((user) => {
                    let toastContent = `Welcome ${user.name} !`
                    Materialize.toast(toastContent, 4000, 'toast-success')
                    $state.go('blog.list')
                }).catch((err) => {
                    console.log(err)
                    let message;
                    if(err.data) {
                        message = err.data.message || err.data
                    } else {
                        message = err
                    }
                    let toastContent = `Error : ${message} !`
                    Materialize.toast(toastContent, 4000, 'toast-error')
                })
            }
        })
    }]
}

export default connect
