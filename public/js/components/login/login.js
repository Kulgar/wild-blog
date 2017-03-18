let login = {
    templateUrl: 'js/components/login/login.html',
    controller: ['$state', function($state) {
        'use strict'
        let $ctrl = this
        $ctrl.state = $state
    }]
}

export default login
