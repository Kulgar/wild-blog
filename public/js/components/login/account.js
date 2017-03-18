let account = {
    templateUrl: 'js/components/login/account.html',
    controller: ['UsersService', '$state', function(UsersService, $state) {
        'use strict'
        let $ctrl = this
        angular.extend(this, {
            create() {
                UsersService.create($ctrl.user).then((res) => {
                    console.log("Success")
                }).then((user) => {
                    let toastContent = `Welcome !`
                    Materialize.toast(toastContent, 4000, 'toast-success')
                    //$state.go('blog.list')
                }).catch((err) => {
                    console.log(err)
                    let toastContent = `Error : ${err.data} !`
                    Materialize.toast(toastContent, 4000, 'toast-error')
                })
            }
        })
    }]
}

export default account
