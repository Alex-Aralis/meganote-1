{
    angular.module('meganote.navbar')
        .directive('aaNavbar', [

        'AuthToken', 'CurrentUser', '$state',
        (AuthToken, CurrentUser) => {
            class NavbarController {
                constructor() {
                    
                }
    
                get user (){
                    return CurrentUser.user;
                }

                signOut(){
                    CurrentUser.clear();
                    AuthToken.clear();
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
