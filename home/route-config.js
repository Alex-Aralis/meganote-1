{
    angular.module('meganote.home')
        .config(homeConfig);

    homeConfig.$inject = ['$stateProvider'];
    function homeConfig($stateProvider){
        $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home/home.html',
        });
    }
}
