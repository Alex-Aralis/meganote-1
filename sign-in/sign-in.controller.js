{
    angular.module('meganote.signIn')
        .controller('SignInController', [
            
            '$state', 
            '$http', 
            'API_BASE', 
            'CurrentUser', 
            'AuthToken', 
            'Flash', 
            'UsersService',
            ($state, 
             $http, 
             API_BASE, 
             CurrentUser, 
             AuthToken, 
             Flash,
             UsersService) => {
            class SignInController {
                constructor(){
                    this.user = {
                        username: '',
                        password: '',
                    };
                }

                signIn(){
                    UsersService.signIn(this.user).then(res => {
                        $state.go('profile.info');
                    })
                    .catch(err => {
                        Flash.create('danger', err.statusText, 3000);
                    });
                }
            }

            return new SignInController;
        }]);
}
