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
                    let toastContent = `Error : ${err.data} !`
                    Materialize.toast(toastContent, 4000, 'toast-error')
                })
            }
        })
    }]
}

export default connect
