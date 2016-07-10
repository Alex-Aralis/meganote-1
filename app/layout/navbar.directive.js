{
    angular.module('meganote.navbar')
        .directive('aaNavbar', [

        'CurrentUser', '$state',
        (CurrentUser, $state) => {
            class NavbarController {
                constructor() {
                    
                }
    
                get user (){
                    return CurrentUser.user;
                }

                signOut(){
                    CurrentUser.clear();
                    $state.go('home');
                }
            }

            return {
                scope: {},
                controller:  NavbarController,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'layout/navbar.html',
            };
        }]);
}
