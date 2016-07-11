{
    angular.module('meganote.signIn')
        .config(signInConfig);

    signInConfig.$inject = ['$stateProvider'];
    function signInConfig($stateProvider){
        $stateProvider

        .state('sign-in', {
            url: '/sign-in',
            templateUrl: 'sign-in/sign-in.html',
            controller: 'SignInController',
            controllerAs: 'vm',
        });
    }
}


