let account = {
    templateUrl: 'js/components/login/account.html',
    controller: ['UsersService', '$state', function(UsersService, $state) {
        'use strict'
        let $ctrl = this
        angular.extend(this, {
            create() {
                UsersService.create($ctrl.user).then((res) => {
                    return UsersService.setToken(res.data.token)
                }).then((user) => {
                    let toastContent = `Welcome ! ${user.name}`
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

export default account
