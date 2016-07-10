{
    angular.module('meganote.profile')
        .config(profileConfig);

    profileConfig.$inject = ['$stateProvider'];
    function profileConfig($stateProvider){
        $stateProvider

        .state('profile', {
            url: '/profile',
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
        })
        .state('profile.info', {
            url: '/info',
            templateUrl: 'profile/profile-info.html',
            controller: 'ProfileInfoController',
            controllerAs: 'vm',
        })
        .state('profile.edit', {
            parent: 'profile',
            url: '^/profile/edit',
            templateUrl: 'profile/profile-edit.html',
            controller: 'ProfileEditController',
            controllerAs: 'vm',
        });
        
    }
}
