{
    angular.module('meganote.signIn')
        .controller('SignInController', [
            
            '$state', '$http', 'API_BASE', 'CurrentUser', 'AuthToken', 
            ($state, $http, API_BASE, CurrentUser, AuthToken) => {
            class SignInController {
                constructor(){
                    this.user = {
                        username: '',
                        password: '',
                    };
                }

                signIn(){
                    $http.post(`${API_BASE}sessions`, {
                        user: this.user,
                    })
                    .then(res => {
                        CurrentUser.user = res.data.user;
                        AuthToken.token = res.data.authToken;
                        $state.go('profile.info');
                    });
                }
            }

            return new SignInController;
        }]);
}
